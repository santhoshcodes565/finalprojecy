import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

const schema = yup.object().shape({
  fullName: yup.string().min(3, 'Minimum 3 characters').required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian phone number').required('Phone is required'),
  subject: yup.string().required('Subject is required'),
  pickupLocation: yup.string(),
  travelDate: yup.date().min(new Date(), 'Date must be in the future').required('Date is required').typeError('Invalid date'),
  message: yup.string().max(500, 'Max 500 characters').required('Message is required'),
});

export default function Contact() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema)
  });

  const messageVal = watch('message', '');

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise(r => setTimeout(r, 1500)); // Simulate API call
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isOpenNow = () => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const date = new Date(utc + (3600000 * 5.5)); // IST
    const hours = date.getHours();
    const day = date.getDay();
    if (day === 0) return hours >= 9 && hours < 17;
    return hours >= 8 && hours < 21;
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-accent)] font-sans">
      {/* SECTION 1 — HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[var(--color-brand-primary)]/60 z-10"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg"
            alt="Contact Hero"
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
        <div className="relative z-20 text-center px-4 animate-on-scroll">
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4 shadow-sm">Get In Touch</h1>
          <p className="text-[var(--color-brand-secondary)] text-lg md:text-xl font-medium tracking-wide">
            We're always here to help — call, WhatsApp, or drop us a message.
          </p>
        </div>
      </section>

      {/* SECTION 2 — CONTACT MAIN */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-5/12 space-y-6 animate-on-scroll">
            <h2 className="font-display text-4xl text-[var(--color-brand-primary)] mb-8">Talk to Us</h2>

            {/* Card 1: Phone */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow flex items-start gap-4">
              <div className="bg-[var(--color-brand-secondary)]/10 p-3 rounded-full"><Phone className="w-6 h-6 text-[var(--color-brand-secondary)]" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-[var(--color-brand-primary)] text-xl font-bold mb-1">+91 98765 43210</p>
                <p className="text-gray-500 text-sm mb-3">Available 24/7 — call anytime</p>
                <button className="text-sm border border-[var(--color-brand-secondary)] text-[var(--color-brand-secondary)] px-4 py-1.5 rounded-lg hover:bg-[var(--color-brand-secondary)] hover:text-white transition-colors font-medium">Call Now</button>
              </div>
            </div>

            {/* Card 2: WhatsApp */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow flex items-start gap-4">
              <div className="bg-[var(--color-brand-secondary)]/10 p-3 rounded-full"><MessageCircle className="w-6 h-6 text-[var(--color-brand-secondary)]" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="text-[var(--color-brand-primary)] text-xl font-bold mb-1">+91 98765 43210</p>
                <p className="text-gray-500 text-sm mb-3">Fastest response — usually within 5 mins</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-block text-sm bg-[#16A34A] text-white px-4 py-1.5 rounded-lg hover:bg-[#15803d] transition-colors font-medium">Open WhatsApp</a>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow flex items-start gap-4">
              <div className="bg-[var(--color-brand-secondary)]/10 p-3 rounded-full"><Mail className="w-6 h-6 text-[var(--color-brand-secondary)]" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-[var(--color-brand-primary)] text-lg font-bold mb-1 break-all">info@srilakshmitravels.com</p>
                <p className="text-gray-500 text-sm mb-3">We reply within 2 hours during business hours</p>
              </div>
            </div>

            {/* Card 4: Office Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow flex items-start gap-4">
              <div className="bg-[var(--color-brand-secondary)]/10 p-3 rounded-full"><MapPin className="w-6 h-6 text-[var(--color-brand-secondary)]" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Office Address</p>
                <p className="text-[var(--color-brand-primary)] font-bold mb-1">No. 45, Gandhi Nagar Main Road, Madurai — 625001, Tamil Nadu, India</p>
                <p className="text-gray-500 text-sm">Mon–Sat: 8:00 AM – 9:00 PM</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-48 bg-gray-200 rounded-xl overflow-hidden mt-6 relative shadow-inner flex items-center justify-center">
              <p className="text-gray-500 font-medium">Map Embed Placeholder</p>
            </div>
          </div>

          {/* RIGHT COLUMN — Form */}
          <div className="w-full lg:w-7/12 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            <div className="bg-white shadow-2xl rounded-3xl p-8 lg:p-10 border border-gray-50">
              <h2 className="font-display text-3xl text-[var(--color-brand-primary)] mb-8">Send Us a Message</h2>

              {isSubmitSuccessful ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center text-green-800">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
                  <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                  <p>We'll reply within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input {...register('fullName')} placeholder="Full Name *" className={`w-full border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none`} />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1 pl-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <input {...register('email')} placeholder="Email Address *" className={`w-full border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input {...register('phone')} placeholder="Phone Number *" className={`w-full border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 pl-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <select {...register('subject')} className={`w-full border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none bg-white`}>
                        <option value="">Select Subject *</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Booking Query">Booking Query</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1 pl-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input {...register('pickupLocation')} placeholder="Pickup Location (Optional)" className="w-full border border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)] rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none" />
                    </div>
                    <div>
                      <input type="date" {...register('travelDate')} className={`w-full border ${errors.travelDate ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none`} />
                      {errors.travelDate && <p className="text-red-500 text-xs mt-1 pl-1">{errors.travelDate.message}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea {...register('message')} placeholder="Your Message *" rows="4" className={`w-full border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-brand-primary)]/20 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent text-gray-800 transition-all outline-none resize-none`}></textarea>
                    <div className="flex justify-between items-center mt-1 px-1">
                      {errors.message ? <p className="text-red-500 text-xs">{errors.message.message}</p> : <div></div>}
                      <p className={`text-xs ${messageVal.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>{messageVal.length}/500</p>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--color-brand-primary)] hover:bg-[#14532D] text-[var(--color-brand-secondary)] text-lg font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    {isSubmitting ? (
                       <><div className="w-5 h-5 border-2 border-[var(--color-brand-secondary)] border-t-transparent rounded-full animate-spin"></div> Sending...</>
                    ) : 'Send Message →'}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                    🔒 Your information is 100% secure and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — OPERATING HOURS */}
      <section className="py-20 bg-[var(--color-brand-primary)] px-4 text-white">
        <div className="max-w-5xl mx-auto text-center animate-on-scroll">
          <h2 className="font-display text-4xl mb-12 flex items-center justify-center gap-4">
            We're Available
            <span className={`text-sm px-3 py-1 rounded-full border border-white max-w-max ${isOpenNow() ? 'bg-green-500' : 'bg-red-500'}`}>
              {isOpenNow() ? 'Open Now' : 'Closed'}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center group hover:bg-white/20 transition-all">
               <span className="text-3xl mb-3">📅</span>
               <p className="text-lg font-medium text-[var(--color-brand-secondary)] mb-1">Monday – Friday</p>
               <p className="text-xl">8:00 AM – 9:00 PM</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center group hover:bg-white/20 transition-all">
               <span className="text-3xl mb-3">📅</span>
               <p className="text-lg font-medium text-[var(--color-brand-secondary)] mb-1">Saturday</p>
               <p className="text-xl">8:00 AM – 7:00 PM</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center group hover:bg-white/20 transition-all">
               <span className="text-3xl mb-3">📅</span>
               <p className="text-lg font-medium text-[var(--color-brand-secondary)] mb-1">Sunday</p>
               <p className="text-xl">9:00 AM – 5:00 PM</p>
            </div>
            <div className="bg-[var(--color-brand-secondary)]/20 backdrop-blur-sm border border-[var(--color-brand-secondary)]/50 rounded-2xl p-6 flex flex-col items-center justify-center group hover:bg-[var(--color-brand-secondary)]/30 transition-all">
               <span className="text-3xl mb-3">☎️</span>
               <p className="text-lg font-medium text-[var(--color-brand-secondary)] mb-1">Emergency Line</p>
               <p className="text-xl">Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FAQ */}
      <section className="py-24 bg-[var(--color-brand-accent)] px-4 text-[var(--color-brand-primary)]">
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <h2 className="font-display text-4xl mb-12 text-center text-[var(--color-brand-primary)]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I book a car?', a: 'You can book online through our website, call us at +91 98765 43210, or WhatsApp us. We confirm your booking within 30 minutes.' },
              { q: 'Can I cancel or modify my booking?', a: 'Yes, free cancellation up to 24 hours before pickup. Modifications are accepted anytime before the trip starts.' },
              { q: 'Do you provide outstation trips?', a: 'Yes! We cover all major destinations across Tamil Nadu and neighboring states. Popular routes include Chennai–Tirupati, Chennai–Ooty, Madurai–Rameswaram.' },
              { q: 'Are your drivers verified?', a: 'All drivers are background-verified, hold valid commercial licenses, and are trained in defensive driving and customer service.' },
              { q: 'What payment methods do you accept?', a: 'Cash, UPI (GPay, PhonePe, Paytm), Bank Transfer, and card payments at pickup.' },
              { q: 'Do you offer airport transfers?', a: 'Yes! We provide airport pickup and drop for Chennai, Coimbatore, Madurai, and Trichy airports at fixed rates.' }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl shadow-sm border border-[var(--color-brand-primary)]/10 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer outline-none">
                  <h3 className="font-display font-bold text-lg">{faq.q}</h3>
                  <span className="text-[var(--color-brand-secondary)] font-bold text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 border-t border-[var(--color-brand-primary)]/5 pt-4">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — EMERGENCY CTA */}
      <section className="py-20 bg-[var(--color-brand-primary)] text-center px-4 border-t border-white/10 animate-on-scroll">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Need urgent help? 📞 Call us now: +91 98765 43210</h2>
          <p className="text-[var(--color-brand-accent)]/80 text-xl mb-10">Our emergency line is active 24/7 — even on holidays.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button className="bg-[var(--color-brand-secondary)] text-[var(--color-brand-primary)] hover:bg-[#F59E0B] font-bold text-xl px-8 py-4 rounded-xl shadow-lg transition-colors">Call Now</button>
             <button className="bg-green-600 text-white hover:bg-green-700 font-bold text-xl px-8 py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">WhatsApp</button>
          </div>
        </div>
      </section>
    </div>
  );
}
