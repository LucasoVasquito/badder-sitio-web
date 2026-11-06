import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, CheckSquare, ArrowLeft, Copy, Check, Phone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

// --- CONFIGURACIÓN DE CONTACTO Y PAGOS ---
const WHATSAPP_NUMBER = "5492215998188"; // Reemplazar con el celular real de la marca
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // Reemplazar por la clave de web3forms.com

export default function Cart() {
  // Fases: 'CART' -> 'CHECKOUT' -> 'SUCCESS'
  const [step, setStep] = useState<"CART" | "CHECKOUT" | "SUCCESS">("CART");
  const { items: cartItems, removeItem, clearCart } = useCartStore();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"RETIRO" | "ENVIO">("RETIRO");
  const [address, setAddress] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // Loading & Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);

  // Clipboard Feedbacks
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, type: "alias" | "cbu") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "alias") {
        setCopiedAlias(true);
        setTimeout(() => setCopiedAlias(false), 2000);
      } else {
        setCopiedCbu(true);
        setTimeout(() => setCopiedCbu(false), 2000);
      }
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setSubmitError("Por favor completa todos los campos requeridos (*).");
      return;
    }

    if (deliveryType === "ENVIO" && !address.trim()) {
      setSubmitError("Por favor ingresa una dirección de envío.");
      return;
    }

    if (!receiptFile) {
      setSubmitError("Por favor adjunta una captura o archivo de tu comprobante de pago.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Simular en desarrollo si no hay API Key de Web3Forms
      if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
        console.warn("Web3Forms access key is not set. Simulating form submission.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        const formData = new FormData();
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("subject", `Nuevo Pedido Merch - ${fullName}`);
        formData.append("name", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("delivery_type", deliveryType);
        formData.append("address", deliveryType === "ENVIO" ? address : "Retiro en La Plata");
        formData.append("account_holder", accountHolder || "Mismo titular");

        const itemsList = cartItems
          .map((item) => `- ${item.name} (Talle: UNIQUE, Cant: ${item.quantity}, Precio: $${item.price.toLocaleString("es-AR")})`)
          .join("\n");
        formData.append("order_items", itemsList);
        formData.append("total_amount", `$${total.toLocaleString("es-AR")}`);
        formData.append("receipt_screenshot", receiptFile);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Error al enviar el comprobante.");
        }
      }

      setSubmittedData({ name: fullName, email });
      setStep("SUCCESS");
      clearCart();
    } catch (error: any) {
      console.error(error);
      setSubmitError(
        error.message || "Hubo un problema al procesar el pedido. Por favor intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* --- FASE 1: CARRITO --- */}
          {step === "CART" && (
            <motion.div
              key="cart-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-16 border-b border-border pb-8">
                <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
                  Order Summary / {cartItems.length} Items
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-foreground uppercase tracking-wider leading-none">
                  Cart
                </h1>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border">
                  <p className="font-mono text-muted-foreground uppercase tracking-widest text-sm mb-6">El carrito está vacío.</p>
                  <Link to="/shop" className="border border-foreground bg-foreground text-background px-8 py-3 font-mono-tight text-xs uppercase tracking-widest hover:bg-transparent hover:text-foreground transition-colors inline-block">
                    Volver al Shop
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {/* Lista de Items */}
                  <div className="flex flex-col gap-4 border-b border-border pb-8">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 md:gap-6 border border-border p-4 relative bg-black/20">
                        <div className="w-20 h-24 md:w-24 md:h-32 shrink-0 bg-black border border-border overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl md:text-2xl uppercase tracking-wide text-foreground">{item.name}</h3>
                              <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="font-mono-tight text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                              {item.category} / Talle: UNIQUE
                            </div>
                          </div>
                          <div className="font-mono text-sm tracking-widest text-foreground">
                            ${item.price.toLocaleString("es-AR")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumen Final y Botón */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-4">
                    <div className="font-mono-tight text-xs tracking-widest text-muted-foreground uppercase max-w-xs leading-relaxed">
                      El costo de envío se coordinará de forma privada luego de procesada la orden.
                    </div>
                    <div className="w-full md:w-auto flex flex-col items-end gap-6">
                      <div className="flex gap-16 justify-between w-full md:w-auto font-mono text-lg uppercase tracking-widest">
                        <span className="text-muted-foreground">Total</span>
                        <span>${total.toLocaleString("es-AR")}</span>
                      </div>
                      <button 
                        onClick={() => setStep("CHECKOUT")}
                        className="w-full md:w-auto border border-foreground bg-foreground text-background px-12 py-4 font-mono-tight text-xs uppercase tracking-[0.2em] hover:bg-transparent hover:text-foreground transition-colors flex items-center justify-center gap-3"
                      >
                        Proceed to Checkout <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* --- FASE 2: CHECKOUT (TRANSFERENCIA) --- */}
          {step === "CHECKOUT" && (
            <motion.div
              key="checkout-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button onClick={() => setStep("CART")} className="mb-12 font-mono-tight text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <ArrowLeft className="w-3 h-3" /> Volver al Carrito
              </button>

              <div className="mb-12 border-b border-border pb-8">
                <h1 className="font-serif text-5xl md:text-7xl text-foreground uppercase tracking-wider leading-none">
                  Checkout
                </h1>
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                {/* Info Bancaria */}
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="font-serif text-2xl uppercase tracking-widest mb-4">Instrucciones</h3>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                      Actualmente nos manejamos mediante transferencias para evitar comisiones de terceros. Por favor, transferí el monto total a la siguiente cuenta y presioná confirmar cuando lo hayas hecho.
                    </p>
                  </div>
                  
                  <div className="bg-muted/10 border border-foreground/30 p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-center border-b border-border pb-4 font-mono">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Total a pagar</span>
                      <span className="text-xl">${total.toLocaleString("es-AR")}</span>
                    </div>
                    <div className="flex flex-col gap-2 font-mono text-sm tracking-wider">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Alias</span>
                        <div className="flex items-center justify-between bg-black border border-border px-3 py-2">
                          <span className="text-foreground select-all">BADDER.EXPERIENCE</span>
                          <button 
                            type="button" 
                            onClick={() => handleCopy("BADDER.EXPERIENCE", "alias")}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          >
                            {copiedAlias ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-4">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">CBU / CVU</span>
                        <div className="flex items-center justify-between bg-black border border-border px-3 py-2">
                          <span className="text-foreground select-all text-xs md:text-sm">000000312389123891283</span>
                          <button 
                            type="button" 
                            onClick={() => handleCopy("000000312389123891283", "cbu")}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          >
                            {copiedCbu ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmación y Datos */}
                <form onSubmit={handleSubmitOrder} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Tu Nombre Completo *</label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" 
                        placeholder="Ingresa tu nombre..." 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Email de Contacto *</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" 
                        placeholder="tu@email.com" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Teléfono / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" 
                        placeholder="Ej: +54 9 221 123-4567" 
                      />
                    </div>

                    {/* Método de Entrega */}
                    <div className="flex flex-col gap-3">
                      <span className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Método de Entrega *</span>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setDeliveryType("RETIRO")}
                          className={`flex-1 border py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                            deliveryType === "RETIRO"
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-foreground border-border hover:border-foreground"
                          }`}
                        >
                          Retiro en La Plata
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType("ENVIO")}
                          className={`flex-1 border py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                            deliveryType === "ENVIO"
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-foreground border-border hover:border-foreground"
                          }`}
                        >
                          Envío a domicilio
                        </button>
                      </div>
                    </div>

                    {/* Dirección condicional */}
                    {deliveryType === "ENVIO" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex flex-col gap-2"
                      >
                        <label className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Dirección de Envío Completa *</label>
                        <input 
                          type="text" 
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" 
                          placeholder="Calle, Altura, Localidad, CP..." 
                        />
                        <span className="font-mono text-[10px] text-muted-foreground mt-1 uppercase">
                          El costo de envío se coordinará y abonará por separado.
                        </span>
                      </motion.div>
                    )}

                    <div className="flex flex-col gap-2">
                      <label className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Titular de la cuenta que transfiere (Si es distinto)</label>
                      <input 
                        type="text" 
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" 
                        placeholder="Opcional..." 
                      />
                    </div>

                    {/* Subida del Comprobante */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Comprobante de Transferencia *</label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="border border-border bg-transparent text-foreground hover:border-foreground hover:text-foreground px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
                        >
                          Seleccionar Archivo
                        </button>
                        <span className="font-mono text-xs text-muted-foreground truncate max-w-[200px]">
                          {receiptFile ? receiptFile.name : "Ninguno seleccionado"}
                        </span>
                      </div>
                      <input 
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setReceiptFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="font-mono text-xs uppercase text-red-500 tracking-wide border border-red-500/30 bg-red-500/5 p-4">
                      {submitError}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="border border-foreground bg-foreground text-background font-mono-tight text-xs uppercase tracking-[0.2em] py-5 hover:bg-transparent hover:text-foreground disabled:opacity-50 transition-colors duration-300 mt-4 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSubmitting ? "Procesando pedido..." : "Ya realicé mi pago"}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- FASE 3: SUCCESS --- */}
          {step === "SUCCESS" && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-20 h-20 bg-foreground text-background flex items-center justify-center mb-8 border border-foreground">
                <CheckSquare className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground uppercase tracking-widest mb-6">Orden Recibida</h1>
              <p className="font-mono text-sm text-muted-foreground max-w-lg leading-relaxed mb-12">
                ¡Gracias por tu compra{submittedData?.name ? `, ${submittedData.name}` : ""}! Los detalles de tu pedido y comprobante de pago han sido enviados. Para acelerar la confirmación y coordinar la entrega, podés contactarnos directamente por WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hola Badder! Acabo de realizar un pedido de merch en la web bajo el nombre de ${submittedData?.name || ""} (${submittedData?.email || ""}). Ya subí el comprobante por el formulario de la web y me pongo en contacto para coordinar.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-foreground bg-foreground text-background px-8 py-4 font-mono-tight text-xs uppercase tracking-[0.2em] hover:bg-[#25D366] hover:text-black hover:border-[#25D366] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
                <Link to="/shop" className="border border-foreground bg-transparent text-foreground px-8 py-4 font-mono-tight text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors flex items-center justify-center">
                  Volver al Shop
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}