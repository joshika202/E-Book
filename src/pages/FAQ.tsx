import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const faqs = [
    {
      id: 'subscription',
      title: 'Subscription & Pricing',
      questions: [
        {
          q: 'What subscription plans do you offer?',
          a: 'We offer a free tier with limited access and a premium tier with full library access. We also have a pay-per-book option for specific titles.'
        },
        {
          q: 'Can I cancel my subscription anytime?',
          a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
        },
        {
          q: 'Is there a free trial for premium features?',
          a: 'Yes, we offer a 14-day free trial of our premium features for new users.'
        }
      ]
    },
    {
      id: 'reading',
      title: 'Reading & Features',
      questions: [
        {
          q: 'Can I read books offline?',
          a: 'Yes, premium users can download books for offline reading on our mobile apps.'
        },
        {
          q: 'How does the AI audio reader work?',
          a: 'Our AI audio reader converts text to natural-sounding speech, allowing you to listen to any book in our library. Premium users can customize voices and reading speeds.'
        },
        {
          q: 'Can I sync my reading progress across devices?',
          a: "Yes, your reading progress, bookmarks, and notes automatically sync across all your devices when you are signed in."
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          q: 'Which devices are supported?',
          a: 'BookVerse works on all modern web browsers, iOS, and Android devices.'
        },
        {
          q: 'How do I report technical issues?',
          a: 'You can report technical issues through our contact form or email support@bookverse.com.'
        },
        {
          q: 'Is my reading data secure?',
          a: 'Yes, we use industry-standard encryption to protect your data and privacy.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about BookVerse's features and services.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left"
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            >
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              {openSection === section.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openSection === section.id && (
              <div className="px-6 pb-4">
                <div className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-900">{faq.q}</h3>
                      <p className="mt-2 text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Still have questions?{' '}
          <a href="/contact" className="text-purple-600 hover:text-purple-700 font-medium">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}