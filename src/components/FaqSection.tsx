import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../data/productData';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden bg-white">
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer text-foreground"
            >
              <span className="font-bold pr-4">{faq.q}</span>
              {openFaq === i ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            <div 
              className={`px-6 text-muted-foreground text-sm leading-relaxed transition-all overflow-hidden ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
