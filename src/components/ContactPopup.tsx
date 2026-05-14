import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MessageSquare, Send, X, Loader2, CheckCircle2 } from 'lucide-react';

export const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Requirement #6: Direct Submission to avinashravat14@gmail.com using FormSubmit AJAX API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form Validation
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error("Please provide a valid email address");
      return;
    }
    if (!message.trim() || message.length < 5) {
      toast.error("Message should be at least 5 characters long");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Dispatching message securely to Avinash Ravat...");

    try {
      const response = await fetch("https://formsubmit.co/ajax/avinashravat14@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `CODE-SLAYER Help / Feedback from ${name}`,
          _template: "table"
        })
      });

      const result = await response.json();

      if (result.success === "true" || response.ok) {
        setSubmitted(true);
        toast.success("Message sent successfully.", { id: toastId });
        // reset fields
        setName('');
        setEmail('');
        setMessage('');
        // auto-close popup after delay
        setTimeout(() => {
          setIsOpen(false);
          setSubmitted(false);
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to deliver payload");
      }
    } catch (err) {
      console.error("Form transmission fault:", err);
      toast.error("Could not send email directly. Please verify active network routing.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating circular trigger button at bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer border border-purple-400/30"
          title="Need Help? Contact Avinash Ravat"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Modal Overlay Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="absolute inset-0" 
            onClick={() => !loading && setIsOpen(false)}
          ></div>

          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 z-10 overflow-hidden animate-scale-up">
            
            {/* Header info */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-100 font-['Outfit']">
                  Need Help? Contact Avinash Ravat
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Send your issue or feedback directly.
                </p>
              </div>

              <button
                onClick={() => !loading && setIsOpen(false)}
                className="text-slate-500 hover:text-slate-300 p-1 rounded-lg transition"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Confirmation status block */}
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-200">Message Delivered</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Your inquiry has been directly routed to <strong className="text-white">avinashravat14@gmail.com</strong>. Avinash will respond shortly.
                </p>
              </div>
            ) : (
              /* Contact form elements */
              <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
                
                {/* Anti-spam auto configuration */}
                <input type="hidden" name="_captcha" value="false" />

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    disabled={loading}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    disabled={loading}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message Context
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design issue, template request, or feedback here..."
                    disabled={loading}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 transition resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg text-xs shadow transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Secure Message</span>
                      </>
                    )}
                  </button>
                  <span className="block text-center text-[10px] text-slate-500 mt-2">
                    Secured by TLS direct routing endpoints
                  </span>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
