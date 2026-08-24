import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronDown, FaCalendarCheck, FaCircleQuestion } from 'react-icons/fa6'

export default function PhilosophyPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Why do health conditions keep recurring despite home remedies?",
      assamese: "ঘৰুৱা উপায়ে অলপ আৰাম দিয়ে… কিন্তু সমস্যাটো বাৰে বাৰে ঘূৰি আহে নেকি? কেৱল লক্ষণটো কমোৱাই নহয়—কিয় বাৰে বাৰে হৈছে, সেই কাৰণটো বুজাটোও জৰুৰী। হোমিঅ’পেথিয়ে কেৱল বিষ কমোৱাতেই লক্ষ্য নাৰাখে। লক্ষ্য থাকে—যি কাৰণত বাৰে বাৰে সমস্যা ঘূৰি আহে, সেই মূল সমস্যাটো বুজি চিকিৎসা আগবঢ়োৱা।",
      english: "Home remedies may give temporary relief, but does your issue keep recurring? Sitting all day or faulty habits may be affecting your bowel & digestive health more than you realize. Homeopathy doesn't focus merely on short-term relief. The primary objective is to identify and address why the problem returns, supporting the body's innate healing mechanism."
    },
    {
      question: "How does Dr. Niharika Bezboruah select homeopathic remedies?",
      assamese: "প্ৰত্যেকজন ৰোগীৰ লক্ষণ, শাৰীৰিক গঠন, মানসিক অৱস্থা আৰু ৰোগৰ ধৰণ বেলেগ। সেইবাবেই একে ৰোগ হ’লেই সকলোৰে বাবে একে ঔষধ নহয়। সঠিক কেছ-টেকিং আৰু চিকিৎসকৰ মূল্যায়নৰ পিছত নিৰ্বাচিত ঔষধে শৰীৰৰ নিজস্ব সুস্থ হোৱাৰ প্ৰক্ৰিয়াক সহায় কৰে।",
      english: "Every patient's symptoms, physical constitution, emotional state, and condition are unique. Thorough case-taking and professional assessment by Dr. Niharika Bezboruah lead to individualized remedy selection for lasting recovery."
    },
    {
      question: "Is a prior appointment mandatory for consultation?",
      assamese: "হাঁ, সুশৃঙ্খল ৰোগী সেৱা আৰু প্ৰত্যেকজন ৰোগীক সময় দি কেছ-টেকিং কৰাৰ বাবে পূৰ্ব নিৰ্ধাৰিত অপইণ্টমেণ্ট থকাটো জৰুৰী। অনলাইন আৰু ক্লিনিক দুয়োবিধ সেৱা উপলব্ধ।",
      english: "Yes, prior appointment is mandatory to ensure dedicated consultation time and unhurried constitutional case-taking for every patient. Both in-clinic and online tele-consultations are available."
    },
    {
      question: "What main clinical conditions are treated at Cureo Clinic?",
      assamese: "আমাৰ ক্লিনিকত মূখ্যতঃ চালৰ সমস্যা (Skin Concerns & Allergies), অৰ্শ/গেছ/পাইলোন প্ৰব্লেম (Piles & Anorectal Care), আৰু হজমী ক্ৰিয়াৰ সমস্যা (Digestive & Bowel Health)ৰ বিশেষ চিকিৎসা প্ৰদান কৰা হয়।",
      english: "At Cureo Clinic, we specialize in gentle, root-cause management for Piles & Anorectal concerns, Digestive & Bowel health issues, and chronic Skin conditions & Allergies."
    },
    {
      question: "Is online consultation available for global patients, and are medicine kits delivered online?",
      assamese: "হাঁ, সমগ্ৰ বিশ্বৰ (Global) ৰোগীসকলৰ বাবে অনলাইন হোৱাটছএপ কাউন্সেলিং আৰু পৰামৰ্শ সেৱা উপলব্ধ। কিন্তু বিশেষভাৱে মন কৰিব—আমাৰ ফালৰ পৰা অনলাইন যোগে মেডিচিন কিট (Medicine Kit) ডেলিভাৰী কৰা নহয়। অনলাইন পৰামৰ্শৰ পিছত ৰোগীক ডিজিটেল প্ৰেচক্ৰিপশ্বন (Digital Prescription) প্ৰদান কৰা হয়, যাৰ দ্বাৰা ৰোগীয়ে নিজৰ স্থানীয় বজাৰৰ পৰা ঔষধ সংগ্ৰহ কৰিব পাৰে।",
      english: "Yes! Dr. Niharika Bezboruah accepts patients across the globe for online video/audio tele-consultations. However, please note: Homeopathic medicine/treatment kits are NOT deliverable through online order or shipped internationally. Online consultation includes thorough constitutional case analysis and digital prescriptions for local remedy procurement."
    }
  ];

  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <div className="section-header">
        <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
        <h2 className="section-title">FAQ & Treatment Approach</h2>
        <p className="section-desc">Understanding constitutional homeopathy, consultation guidelines, and root-cause healing.</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
              <button className="faq-header-button" onClick={() => toggleFaq(index)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCircleQuestion size={20} style={{ color: '#0b6b4f', flexShrink: 0 }} />
                  <span className="faq-question-title">{faq.question}</span>
                </div>
                <div className="faq-icon-arrow">
                  <FaChevronDown size={14} />
                </div>
              </button>

              {isOpen && (
                <div className="faq-body-content">
                  <div className="faq-lang-block">
                    <h5>English Explanation</h5>
                    <p>{faq.english}</p>
                  </div>

                  <div className="faq-lang-block" style={{ backgroundColor: '#f9fcf9', padding: '1rem', borderRadius: '10px', border: '1px solid #e8f3ea' }}>
                    <h5 style={{ color: '#093819' }}>অসমীয়া (Assamese)</h5>
                    <p style={{ color: '#2c3e50', fontWeight: 500 }}>{faq.assamese}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Button with Button 18 Styling */}
      <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
        <Link to="/appointment" className="btn-hero-primary">
          <FaCalendarCheck size={18} />
          <span>Book Consultation with Dr. Niharika</span>
        </Link>
      </div>
    </div>
  )
}
