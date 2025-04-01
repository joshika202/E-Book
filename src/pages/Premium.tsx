import React from 'react';
import { Check, Star, Zap, BookOpen, Headphones, Download, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function Premium() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const handleSubscribe = (plan: 'monthly' | 'annual' | 'lifetime') => {
    if (!user) {
      navigate('/signin');
      return;
    }
    // TODO: Implement actual subscription logic
    setUser({
      ...user,
      subscription: 'premium'
    });
    navigate('/dashboard');
  };

  const plans = [
    {
      name: 'Monthly',
      price: 199,
      period: 'month',
      features: [
        'Unlimited access to all books',
        'AI audiobook feature',
        'Offline reading',
        'Ad-free experience',
        'Priority customer support',
      ],
      notIncluded: [
        'Exclusive author interviews',
        'Early access to new releases',
      ]
    },
    {
      name: 'Annual',
      price: 1999,
      period: 'year',
      savings: '16%',
      popular: true,
      features: [
        'All Monthly features',
        'Exclusive author interviews',
        'Early access to new releases',
        'Monthly book credits',
        'Reading analytics',
      ],
      notIncluded: []
    },
    {
      name: 'Lifetime',
      price: 4999,
      period: 'one-time',
      features: [
        'All Annual features',
        'Lifetime access',
        'Premium book club membership',
        'Exclusive events access',
        'Personal reading consultant',
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of BookVerse with our premium features.
            Choose the plan that best fits your reading journey.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg shadow-sm overflow-hidden ${
                plan.popular ? 'border-2 border-purple-500 transform scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                {plan.savings && (
                  <p className="text-green-600 font-medium mb-4">
                    Save {plan.savings} compared to monthly
                  </p>
                )}
                <button
                  onClick={() => handleSubscribe(plan.name.toLowerCase() as 'monthly' | 'annual' | 'lifetime')}
                  className={`w-full py-3 px-4 rounded-md font-medium ${
                    plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  Get Started
                </button>
              </div>

              <div className="p-6 bg-gray-50 space-y-4">
                <h4 className="font-medium text-gray-900">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start opacity-50">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Unlimited Reading</h3>
              <p className="text-gray-600">Access our entire library of books without restrictions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Headphones className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Audiobooks</h3>
              <p className="text-gray-600">Convert any book to audio with our advanced AI technology</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Download className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Offline Access</h3>
              <p className="text-gray-600">Download books for offline reading on any device</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exclusive Content</h3>
              <p className="text-gray-600">Early access to new releases and exclusive author content</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            100% Satisfaction Guaranteed
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try BookVerse Premium risk-free. If you're not completely satisfied within the first 30 days,
            we'll refund your subscription - no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}