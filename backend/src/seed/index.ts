import type {Db} from 'mongodb';
import {seedMenuItems} from './menu.js';

const helpFaqs = [
  {
    id: 0,
    question: 'How do I reset my password?',
    answer:
      'Go to Profile → Change Password or the login screen → Forgot Password. Email reset requires SMTP to be configured on the server.',
  },
  {
    id: 1,
    question: 'How do I contact support?',
    answer: 'Email info@streetchef.co.za or call +27 67 723 8055.',
  },
  {
    id: 2,
    question: 'How can I update my information?',
    answer: 'Go to Profile → Edit Profile to update your personal information.',
  },
  {
    id: 3,
    question: 'How do I report an issue?',
    answer: 'Report an issue from your order details or contact support.',
  },
  {
    id: 4,
    question: 'How do I manage notifications?',
    answer: 'Go to Profile → Notifications to manage your notification preferences.',
  },
];

const legalContent = {
  key: 'legal',
  title: 'Privacy & Policy',
  effectiveDate: 'January 2025',
  sections: [
    {
      title: '1. Information Collection',
      body: 'We collect essential information to enhance your experience. This includes details you provide directly, such as account data, as well as information gathered through usage analytics and cookies.',
    },
    {
      title: '2. Information Usage',
      body: 'The information collected is used to improve our services, provide personalized recommendations, and ensure a seamless experience. We do not share your data without your explicit consent.',
    },
    {
      title: '3. Information Setting',
      body: 'You have full control over your data. Manage your privacy preferences, update personal details, and customize your settings to match your needs.',
    },
    {
      title: '4. Security Measures',
      body: "We prioritize your data's safety with advanced security protocols, encryption methods, and regular audits to protect against unauthorized access or breaches.",
    },
  ],
};

export async function seedDatabase(db: Db): Promise<void> {
  const menuCount = await db.collection('menuItems').countDocuments();
  if (menuCount === 0) {
    await db.collection('menuItems').insertMany(seedMenuItems);
    console.log(`Seeded ${seedMenuItems.length} menu items`);
  }

  const help = await db.collection('content').findOne({key: 'help'});
  if (!help) {
    await db.collection('content').insertOne({key: 'help', faqs: helpFaqs});
    console.log('Seeded help content');
  }

  const legal = await db.collection('content').findOne({key: 'legal'});
  if (!legal) {
    await db.collection('content').insertOne(legalContent);
    console.log('Seeded legal content');
  }
}
