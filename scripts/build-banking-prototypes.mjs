import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const DEV = '/Users/georgele/projects/mobile/dev';

const banks = [
  {
    id: 472, name: 'Chase Mobile', slug: 'chase-mobile-mobile-clone',
    pkg: 'chase-mobile-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, deposits, transfers, bill pay, card controls, and financial services.',
    bg: '#0c2340', accent: '#1a73e8', panelBorder: '#c5d4e8', panelBg: '#eef4fb', cardBg: '#dde8f5', heroBg: '#0c2340', heroText: '#e8f0fa', pageBg: '#e8eef6', textColor: '#0c1e33', metaColor: '#4a6a8a', pillBg: '#c5d8ed', amountColor: '#0c2340', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Total Checking', last4: '4821', balance: 872340, pending: 15200 },
      { type: 'Savings', name: 'Chase Savings', last4: '9012', balance: 2450000, pending: 0 },
      { type: 'Credit Card', name: 'Sapphire Preferred', last4: '7733', balance: -245600, limit: 1500000, rewards: '48,320 points' }
    ],
    transactions: [
      { desc: 'Direct Deposit - Employer', amount: 325000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Whole Foods Market', amount: -8745, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Transfer to Savings', amount: -50000, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Transfer' },
      { desc: 'Netflix Subscription', amount: -1599, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Gas Station', amount: -4520, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Auto' },
      { desc: 'Zelle from Alex T.', amount: 5000, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['QuickPay with Zelle', 'Credit Journey (Score)', 'Offers & Deals', 'Investment Accounts', 'Mortgage & Home Lending', 'Auto Finance'],
    blockerPrefix: 'Chase'
  },
  {
    id: 473, name: 'Bank of America', slug: 'bank-of-america-mobile-banking-mobile-clone',
    pkg: 'bank-of-america-mobile-banking-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, Erica assistant, transfers, bill pay, and rewards.',
    bg: '#012169', accent: '#e31837', panelBorder: '#c5cde8', panelBg: '#eef0fb', cardBg: '#dde2f5', heroBg: '#012169', heroText: '#e8ecfa', pageBg: '#e6eaf4', textColor: '#0c1433', metaColor: '#4a5a8a', pillBg: '#c5ceed', amountColor: '#012169', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Advantage Plus', last4: '3347', balance: 654210, pending: 8900 },
      { type: 'Savings', name: 'Advantage Savings', last4: '5590', balance: 1875000, pending: 0 },
      { type: 'Credit Card', name: 'Customized Cash Rewards', last4: '2201', balance: -189400, limit: 1200000, rewards: '3% cashback active' }
    ],
    transactions: [
      { desc: 'Payroll Deposit', amount: 287500, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Target Store', amount: -6532, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Shopping' },
      { desc: 'Electric Utility Co.', amount: -14500, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Utilities' },
      { desc: 'Spotify Premium', amount: -1099, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Restaurant', amount: -3875, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Dining' },
      { desc: 'Zelle from Jordan M.', amount: 7500, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Erica Virtual Assistant', 'Zelle Transfers', 'Preferred Rewards', 'Merrill Investing', 'Mortgage Center', 'Auto Loans'],
    blockerPrefix: 'Bank of America'
  },
  {
    id: 474, name: 'Wells Fargo', slug: 'wells-fargo-mobile-mobile-clone',
    pkg: 'wells-fargo-mobile-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, Fargo assistant, transfers, bill pay, and card controls.',
    bg: '#d71e28', accent: '#ffcd41', panelBorder: '#e8c5c5', panelBg: '#fbeeee', cardBg: '#f5dddd', heroBg: '#d71e28', heroText: '#fae8e8', pageBg: '#f4e6e6', textColor: '#330c0c', metaColor: '#8a4a4a', pillBg: '#edc5c5', amountColor: '#8b0000', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Everyday Checking', last4: '7812', balance: 543670, pending: 12300 },
      { type: 'Savings', name: 'Way2Save Savings', last4: '4455', balance: 982000, pending: 0 },
      { type: 'Credit Card', name: 'Active Cash Card', last4: '8890', balance: -156700, limit: 800000, rewards: '2% cash rewards' }
    ],
    transactions: [
      { desc: 'Direct Deposit - Employer', amount: 298000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Costco Wholesale', amount: -15632, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Shopping' },
      { desc: 'Water & Sewer Utility', amount: -8900, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Utilities' },
      { desc: 'Hulu Subscription', amount: -1799, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Pharmacy', amount: -2345, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Health' },
      { desc: 'Zelle Received', amount: 4000, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Fargo Virtual Assistant', 'Zelle Transfers', 'Wells Fargo Rewards', 'WellsTrade Investing', 'Home Mortgage', 'Auto Loans'],
    blockerPrefix: 'Wells Fargo'
  },
  {
    id: 475, name: 'Citi Mobile', slug: 'citi-mobile-mobile-clone',
    pkg: 'citi-mobile-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, transfers, bill pay, card controls, and ThankYou rewards.',
    bg: '#003b70', accent: '#0066a1', panelBorder: '#b8d4e8', panelBg: '#edf4fb', cardBg: '#d8e8f5', heroBg: '#003b70', heroText: '#e0f0fa', pageBg: '#e4eef6', textColor: '#0a1e33', metaColor: '#4a6888', pillBg: '#b8d4eb', amountColor: '#003b70', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Citi Priority Checking', last4: '6634', balance: 723450, pending: 5600 },
      { type: 'Savings', name: 'Citi Accelerate Savings', last4: '1127', balance: 3150000, pending: 0 },
      { type: 'Credit Card', name: 'Double Cash Card', last4: '9988', balance: -312500, limit: 2000000, rewards: '2% on everything' }
    ],
    transactions: [
      { desc: 'Payroll Direct Deposit', amount: 345000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Amazon Purchase', amount: -12499, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Shopping' },
      { desc: 'Internet Service', amount: -7999, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Utilities' },
      { desc: 'Disney+ Bundle', amount: -1399, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Coffee Shop', amount: -875, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Dining' },
      { desc: 'Zelle Transfer In', amount: 10000, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Zelle Transfers', 'ThankYou Rewards', 'Citi Entertainment', 'Global Transfers', 'Mortgage & Lending', 'Wealth Management'],
    blockerPrefix: 'Citi'
  },
  {
    id: 476, name: 'Capital One', slug: 'capital-one-mobile-mobile-clone',
    pkg: 'capital-one-mobile-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, Eno assistant, transfers, auto loans, and credit card management.',
    bg: '#004977', accent: '#d03027', panelBorder: '#b8cce8', panelBg: '#edf2fb', cardBg: '#d8e4f5', heroBg: '#004977', heroText: '#e0ecfa', pageBg: '#e2ecf4', textColor: '#0a1a30', metaColor: '#4a6080', pillBg: '#b8cce8', amountColor: '#004977', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: '360 Checking', last4: '2290', balance: 489500, pending: 3400 },
      { type: 'Savings', name: '360 Performance Savings', last4: '7701', balance: 4200000, pending: 0 },
      { type: 'Credit Card', name: 'Venture X', last4: '5544', balance: -278900, limit: 2500000, rewards: '75,000 miles' }
    ],
    transactions: [
      { desc: 'Direct Deposit', amount: 310000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Trader Joe\'s', amount: -6789, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Auto Loan Payment', amount: -45000, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Auto' },
      { desc: 'YouTube Premium', amount: -1399, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Rideshare', amount: -2150, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Transport' },
      { desc: 'Zelle from Casey L.', amount: 3000, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Eno Virtual Assistant', 'Zelle Transfers', 'Capital One Rewards', 'Auto Navigator', 'Credit Score Tracker', 'Capital One Shopping'],
    blockerPrefix: 'Capital One'
  },
  {
    id: 477, name: 'American Express', slug: 'american-express-mobile-clone',
    pkg: 'american-express-mobile-clone',
    desc: 'Original static mobile prototype for card management, Membership Rewards, Amex Offers, and account services.',
    bg: '#006fcf', accent: '#00175a', panelBorder: '#b0d0f0', panelBg: '#ecf4fd', cardBg: '#d4e6f8', heroBg: '#006fcf', heroText: '#e4f0fd', pageBg: '#e0ecf6', textColor: '#0a1830', metaColor: '#456a90', pillBg: '#b0d0f0', amountColor: '#006fcf', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Credit Card', name: 'Platinum Card', last4: '1001', balance: -435600, limit: 0, rewards: '120,000 MR points' },
      { type: 'Credit Card', name: 'Gold Card', last4: '2002', balance: -189200, limit: 0, rewards: '45,800 MR points' },
      { type: 'Savings', name: 'High Yield Savings', last4: '3003', balance: 5000000, pending: 0 }
    ],
    transactions: [
      { desc: 'Delta Air Lines', amount: -45600, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Travel' },
      { desc: 'Whole Foods Market', amount: -9823, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Statement Credit - Amex Offer', amount: 1500, type: 'credit', date: 'May 31', status: 'posted', category: 'Rewards' },
      { desc: 'Uber Eats', amount: -3456, type: 'debit', date: 'May 31', status: 'posted', category: 'Dining' },
      { desc: 'Pending - Hotel Booking', amount: -28900, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Travel' },
      { desc: 'Payment Received - Thank You', amount: 200000, type: 'credit', date: 'May 30', status: 'posted', category: 'Payment' }
    ],
    services: ['Membership Rewards', 'Amex Offers', 'Pay Over Time', 'Plan It Payment Plan', 'Travel & Lifestyle Services', 'Amex Business Blueprint'],
    blockerPrefix: 'American Express'
  },
  {
    id: 478, name: 'Discover', slug: 'discover-mobile-mobile-clone',
    pkg: 'discover-mobile-mobile-clone',
    desc: 'Original static mobile prototype for card management, cashback rewards, savings, and personal loans.',
    bg: '#ff6000', accent: '#1a1a1a', panelBorder: '#e8d0b8', panelBg: '#fdf4ec', cardBg: '#f8e8d4', heroBg: '#ff6000', heroText: '#fdf0e4', pageBg: '#f6ece2', textColor: '#331a0a', metaColor: '#8a6040', pillBg: '#edc8a8', amountColor: '#cc4d00', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Credit Card', name: 'Discover it Cash Back', last4: '4456', balance: -134500, limit: 1000000, rewards: '$245.30 cashback' },
      { type: 'Savings', name: 'Online Savings', last4: '7789', balance: 2800000, pending: 0 },
      { type: 'Checking', name: 'Cashback Debit', last4: '1122', balance: 345600, pending: 2100 }
    ],
    transactions: [
      { desc: 'Direct Deposit', amount: 275000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Home Depot', amount: -15678, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Home' },
      { desc: '5% Cashback - Grocery Q2', amount: 2345, type: 'credit', date: 'Jun 1', status: 'posted', category: 'Rewards' },
      { desc: 'Peacock Subscription', amount: -1299, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Gas Station', amount: -5100, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Auto' },
      { desc: 'Personal Loan Payment', amount: -25000, type: 'debit', date: 'May 30', status: 'posted', category: 'Loan' }
    ],
    services: ['Cashback Rewards Center', 'FICO Credit Scorecard', 'Freeze It (Card Lock)', 'Personal Loans', 'Student Loans', 'Home Equity Loans'],
    blockerPrefix: 'Discover'
  },
  {
    id: 479, name: 'U.S. Bank', slug: 'u-s-bank-mobile-clone',
    pkg: 'u-s-bank-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, transfers, bill pay, card controls, and rewards.',
    bg: '#002855', accent: '#d50032', panelBorder: '#b8c8e0', panelBg: '#edf2f8', cardBg: '#d8e2f0', heroBg: '#002855', heroText: '#e0ecf8', pageBg: '#e2eaf2', textColor: '#0a1828', metaColor: '#4a6078', pillBg: '#b8c8e0', amountColor: '#002855', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Gold Checking', last4: '5567', balance: 612300, pending: 7800 },
      { type: 'Savings', name: 'Standard Savings', last4: '8834', balance: 1560000, pending: 0 },
      { type: 'Credit Card', name: 'Altitude Go', last4: '3301', balance: -98700, limit: 750000, rewards: '25,400 points' }
    ],
    transactions: [
      { desc: 'Payroll Direct Deposit', amount: 265000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Kroger Grocery', amount: -7823, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Mortgage Payment', amount: -175000, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Housing' },
      { desc: 'Apple Music', amount: -1099, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Hardware Store', amount: -4567, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Home' },
      { desc: 'Zelle Received', amount: 6000, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Zelle Transfers', 'U.S. Bank Rewards', 'Credit Score Monitoring', 'Wealth Management', 'Mortgage Center', 'Auto Loans'],
    blockerPrefix: 'U.S. Bank'
  },
  {
    id: 480, name: 'PNC Mobile', slug: 'pnc-mobile-mobile-clone',
    pkg: 'pnc-mobile-mobile-clone',
    desc: 'Original static mobile prototype for Virtual Wallet dashboard, transfers, bill pay, and financial tools.',
    bg: '#f58025', accent: '#002a54', panelBorder: '#e0ceb8', panelBg: '#fdf6ed', cardBg: '#f5eadb', heroBg: '#f58025', heroText: '#fdf2e4', pageBg: '#f4ece0', textColor: '#2a1a0a', metaColor: '#806040', pillBg: '#e8d0b0', amountColor: '#c06000', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Virtual Wallet Spend', last4: '9901', balance: 478900, pending: 4500 },
      { type: 'Savings', name: 'Virtual Wallet Reserve', last4: '9902', balance: 125000, pending: 0 },
      { type: 'Savings', name: 'Virtual Wallet Growth', last4: '9903', balance: 850000, pending: 0 },
      { type: 'Credit Card', name: 'Cash Rewards Card', last4: '1155', balance: -67800, limit: 500000, rewards: '1.5% cashback' }
    ],
    transactions: [
      { desc: 'Direct Deposit', amount: 255000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Giant Eagle', amount: -9234, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Student Loan Payment', amount: -35000, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Loan' },
      { desc: 'Paramount+ Sub', amount: -599, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Parking', amount: -1200, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Transport' },
      { desc: 'Zelle from Sam R.', amount: 5500, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Virtual Wallet Calendar', 'Zelle Transfers', 'PNC Rewards', 'Low Cash Mode', 'Investment Accounts', 'Home Lending'],
    blockerPrefix: 'PNC'
  },
  {
    id: 481, name: 'TD Bank', slug: 'td-bank-mobile-clone',
    pkg: 'td-bank-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, transfers, bill pay, and TD Ameritrade integration.',
    bg: '#008a00', accent: '#1a1a1a', panelBorder: '#b8e0c0', panelBg: '#edfbef', cardBg: '#d4f0da', heroBg: '#008a00', heroText: '#e4fae8', pageBg: '#e0f2e4', textColor: '#0a280e', metaColor: '#407848', pillBg: '#b8e0c0', amountColor: '#006a00', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'TD Beyond Checking', last4: '6678', balance: 534200, pending: 6700 },
      { type: 'Savings', name: 'TD Simple Savings', last4: '2245', balance: 1120000, pending: 0 },
      { type: 'Credit Card', name: 'TD Double Up Card', last4: '8811', balance: -112300, limit: 900000, rewards: '2% cashback' }
    ],
    transactions: [
      { desc: 'Payroll Deposit', amount: 285000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Stop & Shop', amount: -8456, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Car Insurance', amount: -12500, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Insurance' },
      { desc: 'HBO Max', amount: -1599, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Bookstore', amount: -3456, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Shopping' },
      { desc: 'Zelle Received', amount: 8000, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Zelle Transfers', 'TD Ameritrade Link', 'TD Rewards', 'Credit Score Monitoring', 'Mortgage Center', 'Home Equity'],
    blockerPrefix: 'TD Bank'
  },
  {
    id: 482, name: 'Truist', slug: 'truist-mobile-clone',
    pkg: 'truist-mobile-clone',
    desc: 'Original static mobile prototype for banking dashboard, transfers, bill pay, and financial wellness tools.',
    bg: '#5c2d91', accent: '#e31c79', panelBorder: '#d0bce0', panelBg: '#f6f0fb', cardBg: '#e8daf5', heroBg: '#5c2d91', heroText: '#f0e4fa', pageBg: '#eee4f4', textColor: '#1e0a33', metaColor: '#6a4a8a', pillBg: '#d0bce0', amountColor: '#5c2d91', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Truist One Checking', last4: '4490', balance: 398700, pending: 5200 },
      { type: 'Savings', name: 'Truist One Savings', last4: '7723', balance: 945000, pending: 0 },
      { type: 'Credit Card', name: 'Truist Enjoy Cash', last4: '6612', balance: -78900, limit: 600000, rewards: '3% cashback dining' }
    ],
    transactions: [
      { desc: 'Direct Deposit', amount: 248000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Publix Super Markets', amount: -7654, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Rent Payment', amount: -165000, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Housing' },
      { desc: 'Max Subscription', amount: -1699, type: 'debit', date: 'May 31', status: 'posted', category: 'Entertainment' },
      { desc: 'Pending - Dry Cleaner', amount: -2100, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Services' },
      { desc: 'Zelle from Morgan P.', amount: 4500, type: 'credit', date: 'May 30', status: 'posted', category: 'P2P' }
    ],
    services: ['Zelle Transfers', 'Truist Rewards', 'Financial Wellness Score', 'Truist Invest', 'Mortgage Center', 'Small Business Banking'],
    blockerPrefix: 'Truist'
  },
  {
    id: 483, name: 'USAA', slug: 'usaa-mobile-clone',
    pkg: 'usaa-mobile-clone',
    desc: 'Original static mobile prototype for military banking dashboard, insurance hub, transfers, and member services.',
    bg: '#00355f', accent: '#c41230', panelBorder: '#b0c8e0', panelBg: '#ecf2f8', cardBg: '#d0e0f0', heroBg: '#00355f', heroText: '#dceaf8', pageBg: '#e0eaf2', textColor: '#081828', metaColor: '#405878', pillBg: '#b0c8e0', amountColor: '#00355f', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Classic Checking', last4: '1178', balance: 567800, pending: 3200 },
      { type: 'Savings', name: 'Performance First Savings', last4: '3345', balance: 2340000, pending: 0 },
      { type: 'Credit Card', name: 'Cashback Rewards Plus', last4: '5590', balance: -145600, limit: 1500000, rewards: '1.5% unlimited cashback' }
    ],
    transactions: [
      { desc: 'Military Pay Deposit', amount: 420000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Commissary Purchase', amount: -6789, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Groceries' },
      { desc: 'Auto Insurance Premium', amount: -18500, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Insurance' },
      { desc: 'USAA Life Insurance', amount: -4500, type: 'debit', date: 'May 31', status: 'posted', category: 'Insurance' },
      { desc: 'Pending - PX/Exchange', amount: -8900, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Shopping' },
      { desc: 'Deposit - VA Benefits', amount: 150000, type: 'credit', date: 'May 30', status: 'posted', category: 'Government' }
    ],
    services: ['Zelle Transfers', 'Insurance Hub', 'USAA Rewards', 'Investment Accounts', 'VA Home Loans', 'Military Transition Services'],
    blockerPrefix: 'USAA'
  },
  {
    id: 484, name: 'Navy Federal Credit Union', slug: 'navy-federal-credit-union-mobile-clone',
    pkg: 'navy-federal-credit-union-mobile-clone',
    desc: 'Original static mobile prototype for credit union dashboard, transfers, bill pay, and member services.',
    bg: '#003366', accent: '#bf9b30', panelBorder: '#b0c0d8', panelBg: '#ecf0f6', cardBg: '#d0dcea', heroBg: '#003366', heroText: '#dce8f6', pageBg: '#dee8f0', textColor: '#081830', metaColor: '#405070', pillBg: '#b0c0d8', amountColor: '#003366', statusDebit: '#b33020', statusCredit: '#1a7e2e', statusPending: '#8a7a30',
    accounts: [
      { type: 'Checking', name: 'Free Active Duty Checking', last4: '2290', balance: 489300, pending: 4100 },
      { type: 'Savings', name: 'Share Savings', last4: '5501', balance: 1780000, pending: 0 },
      { type: 'Credit Card', name: 'cashRewards Card', last4: '7788', balance: -89400, limit: 800000, rewards: '1.5% cashback' }
    ],
    transactions: [
      { desc: 'Military Pay Deposit', amount: 380000, type: 'credit', date: 'Jun 2', status: 'posted', category: 'Income' },
      { desc: 'Exchange/PX', amount: -5678, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Shopping' },
      { desc: 'Homeowners Insurance', amount: -15600, type: 'debit', date: 'Jun 1', status: 'posted', category: 'Insurance' },
      { desc: 'Amazon Prime', amount: -1499, type: 'debit', date: 'May 31', status: 'posted', category: 'Shopping' },
      { desc: 'Pending - Food Court', amount: -1234, type: 'debit', date: 'Jun 2', status: 'pending', category: 'Dining' },
      { desc: 'Dividend Credit', amount: 850, type: 'credit', date: 'May 30', status: 'posted', category: 'Dividends' }
    ],
    services: ['Zelle Transfers', 'NFCU Rewards', 'Certificate (CD) Accounts', 'Investment Services', 'VA & Military Home Loans', 'Auto Loans & Buying'],
    blockerPrefix: 'Navy Federal'
  }
];

const blockers = [
  'Real banking rails, ACH/wire transfers, RTP/FedNow, and real-time payment settlement.',
  'KYC/AML identity verification, SSN collection, sanctions screening, and OFAC compliance.',
  'FDIC/NCUA deposit insurance verification and regulatory disclosures.',
  'Biometric authentication, device trust, and native security features.',
  'Mobile check capture, image processing, and deposit clearing.',
  'Bill pay execution, payee verification, and scheduled payment processing.',
  'Card provisioning, EMV chip/tap, card-network integrations, and digital wallet provisioning.',
  'Loan origination, mortgage processing, credit underwriting, and interest rate calculations.',
  'Real balances, live transaction feeds, and provider-backed statement generation.',
  'PCI-DSS card storage, tokenization, and payment credential management.',
  'Fraud monitoring, risk scoring, unauthorized-transaction disputes, and chargeback processing.',
  'Zelle/P2P real money movement and recipient verification.',
  'Investment/brokerage account linking, securities trading, and portfolio management.',
  'ATM/branch network integration, geolocation services, and real-time availability.',
  'Regulatory compliance: GLBA privacy, Reg E disputes, TILA disclosures, ECOA, BSA/AML, and state banking regulations.'
];

function money(cents) {
  return '$' + (Math.abs(cents) / 100).toFixed(2);
}

function generateIndexHtml(bank) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Banking Prototype</title>
    <link rel="stylesheet" href="src/styles.css">
  </head>
  <body>
    <main class="phone-shell">
      <section class="hero">
        <p class="eyebrow">Synthetic banking app</p>
        <h1>Manage accounts, transfers, and payments without real banking rails.</h1>
        <p>Checking &amp; savings dashboards, transaction history, transfers, bill pay, mobile deposit, card management, and explicit blockers for regulated features.</p>
      </section>
      <section class="panel"><h2>Accounts Overview</h2><div id="accounts"></div></section>
      <section class="panel"><h2>Recent Transactions</h2><div id="transactions" class="list"></div></section>
      <section class="panel"><h2>Transfers</h2><div id="transfers"></div></section>
      <section class="panel"><h2>Bill Pay</h2><div id="billpay"></div></section>
      <section class="panel"><h2>Mobile Deposit</h2><div id="deposit"></div></section>
      <section class="panel"><h2>ATM &amp; Branch Locator</h2><div id="locator"></div></section>
      <section class="panel"><h2>Card Management</h2><div id="cards" class="list"></div></section>
      <section class="panel"><h2>Services</h2><div id="services" class="list"></div></section>
      <section class="panel"><h2>Settings</h2><div id="settings" class="list"></div></section>
      <section class="panel blocker"><h2>Blocked Until Verified</h2><ul id="blockers"></ul></section>
    </main>
    <script src="src/app.js"></script>
  </body>
</html>
`;
}

function generatePackageJson(bank) {
  return JSON.stringify({
    name: bank.pkg,
    version: '0.1.0',
    private: true,
    description: bank.desc,
    scripts: {
      check: 'node --check src/app.js'
    }
  }, null, 2) + '\n';
}

function generateStylesCss(bank) {
  return `:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: ${bank.pageBg};
  color: ${bank.textColor};
}
body { margin: 0; min-height: 100vh; display: grid; place-items: start center; }
.phone-shell { width: min(430px, 100%); min-height: 100vh; background: #fff; box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15); }
.hero { padding: 32px 22px 22px; background: ${bank.heroBg}; color: ${bank.heroText}; }
.eyebrow { margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0; opacity: 0.8; }
h1, h2, p { margin-top: 0; }
h1 { font-size: 30px; line-height: 1.05; margin-bottom: 12px; }
h2 { font-size: 16px; }
.panel { margin: 14px; padding: 16px; border: 1px solid ${bank.panelBorder}; border-radius: 8px; background: ${bank.panelBg}; }
.card { padding: 12px; border-radius: 8px; background: ${bank.cardBg}; margin-top: 10px; }
.meta { color: ${bank.metaColor}; font-size: 13px; }
.pill { display: inline-block; padding: 4px 8px; border-radius: 999px; background: ${bank.pillBg}; font-size: 12px; margin: 4px 6px 0 0; }
.amount { font-size: 28px; font-weight: 700; color: ${bank.amountColor}; }
.balance-row { display: flex; justify-content: space-between; align-items: baseline; }
.status-debit { color: ${bank.statusDebit}; }
.status-credit { color: ${bank.statusCredit}; }
.status-pending { color: ${bank.statusPending}; }
.blocker { border-color: #c4a86e; }
.list { display: flex; flex-direction: column; gap: 4px; }
.account-type { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; }
`;
}

function generateAppJs(bank) {
  const accountsJson = JSON.stringify(bank.accounts);
  const txJson = JSON.stringify(bank.transactions);
  const servicesJson = JSON.stringify(bank.services);
  const blockersJson = JSON.stringify(blockers.map(function(b) { return b.replace(/^/, bank.blockerPrefix + ': '); }));

  return `var data = {
  accounts: ${accountsJson},
  transactions: ${txJson},
  services: ${servicesJson},
  settings: [
    "Profile & personal information",
    "Notification & alert preferences",
    "Security settings & password",
    "Privacy controls & data sharing",
    "Paperless statements",
    "Linked external accounts",
    "Support & help center",
    "Legal disclosures & agreements",
    "Account closure request"
  ],
  blockers: ${blockersJson}
};

var money = function (cents) { return "$" + (Math.abs(cents) / 100).toFixed(2); };
var render = function (id, html) { document.getElementById(id).innerHTML = html; };

render("accounts", data.accounts.map(function (a) {
  var balLabel = a.balance < 0 ? "current balance" : "available";
  var extra = a.limit ? '<p class="meta">Credit limit: ' + money(a.limit) + '</p>' : '';
  var rewards = a.rewards ? '<span class="pill">' + a.rewards + '</span>' : '';
  var pending = a.pending ? '<p class="meta">Pending: ' + money(a.pending) + '</p>' : '';
  return '<div class="card">' +
    '<span class="account-type">' + a.type + '</span>' +
    '<div class="balance-row"><span class="amount">' + money(a.balance) + '</span><span class="meta">' + balLabel + '</span></div>' +
    '<p class="meta">' + a.name + ' ****' + a.last4 + '</p>' +
    pending + extra + rewards +
  '</div>';
}).join(""));

render("transactions", data.transactions.map(function (tx) {
  var sign = tx.type === "credit" ? "+" : "-";
  var statusClass = tx.type === "credit" ? "status-credit" : tx.status === "pending" ? "status-pending" : "status-debit";
  return '<article class="card">' +
    '<strong>' + sign + money(tx.amount) + '</strong>' +
    ' <span class="' + statusClass + '">' + tx.status + '</span>' +
    '<p class="meta">' + tx.desc + ' · ' + tx.date + '</p>' +
    '<span class="pill">' + tx.category + '</span>' +
  '</article>';
}).join(""));

render("transfers",
  '<div class="card">' +
    '<strong>Transfer Money</strong>' +
    '<p class="meta">Move funds between your accounts or send to external accounts.</p>' +
    '<div style="margin-top:8px"><strong>Internal Transfer</strong><p class="meta">Between your checking, savings, and credit accounts. Select source, destination, amount, and frequency.</p></div>' +
    '<div style="margin-top:8px"><strong>External Transfer</strong><p class="meta">To or from accounts at other banks via ACH. 1-3 business day processing.</p></div>' +
    '<div style="margin-top:8px"><strong>Wire Transfer</strong><p class="meta">Domestic and international wire transfers. Same-day for domestic.</p></div>' +
    '<div style="margin-top:8px"><strong>Zelle</strong><p class="meta">Send and receive money with people you know using email or phone number.</p></div>' +
    '<p class="meta" style="margin-top:12px">All transfer execution is simulated. No real money movement occurs.</p>' +
  '</div>'
);

render("billpay",
  '<div class="card">' +
    '<strong>Pay Bills</strong>' +
    '<p class="meta">Manage payees and schedule payments.</p>' +
    '<div style="margin-top:8px"><strong>Saved Payees</strong></div>' +
    '<div class="meta">Electric Company — next due Jun 15</div>' +
    '<div class="meta">Internet Provider — next due Jun 20</div>' +
    '<div class="meta">Credit Card — next due Jun 25</div>' +
    '<div style="margin-top:8px"><strong>Add Payee</strong><p class="meta">Search by name or enter account details manually.</p></div>' +
    '<div style="margin-top:8px"><strong>Scheduled & Recurring</strong><p class="meta">View upcoming, edit frequency, or cancel scheduled payments.</p></div>' +
    '<p class="meta" style="margin-top:12px">Bill pay execution is simulated. No real payments are sent.</p>' +
  '</div>'
);

render("deposit",
  '<div class="card">' +
    '<strong>Mobile Check Deposit</strong>' +
    '<p class="meta">Deposit checks by taking a photo with your device camera.</p>' +
    '<div style="margin-top:8px"><p class="meta">1. Select destination account</p></div>' +
    '<div><p class="meta">2. Enter check amount</p></div>' +
    '<div><p class="meta">3. Capture front and back of check</p></div>' +
    '<div><p class="meta">4. Review and submit</p></div>' +
    '<p class="meta" style="margin-top:12px">Mobile deposit is simulated. Camera capture, image processing, and deposit clearing require native device access and bank processing.</p>' +
  '</div>'
);

render("locator",
  '<div class="card">' +
    '<strong>Find ATMs &amp; Branches</strong>' +
    '<p class="meta">Search by address, zip code, or use current location.</p>' +
    '<div style="margin-top:8px"><strong>Nearby (simulated)</strong></div>' +
    '<div class="meta">Main St Branch — 0.3 mi — Open until 5:00 PM</div>' +
    '<div class="meta">Downtown ATM — 0.5 mi — 24/7</div>' +
    '<div class="meta">Market Square Branch — 1.2 mi — Open until 6:00 PM</div>' +
    '<p class="meta" style="margin-top:12px">Location data is simulated. Real geolocation, branch hours, and ATM network availability require provider integration.</p>' +
  '</div>'
);

render("cards", data.accounts.filter(function (a) {
  return a.type === "Credit Card" || a.type === "Checking";
}).map(function (a) {
  var cardType = a.type === "Credit Card" ? "Credit Card" : "Debit Card";
  return '<article class="card">' +
    '<strong>' + cardType + ' · ****' + a.last4 + '</strong>' +
    '<p class="meta">' + a.name + '</p>' +
    '<span class="pill">Lock / Unlock</span>' +
    '<span class="pill">Report Lost</span>' +
    '<span class="pill">Request Replacement</span>' +
    '<span class="pill">Set Travel Notice</span>' +
    (a.type === "Credit Card" ? '<span class="pill">Dispute Transaction</span><span class="pill">View Rewards</span>' : '') +
  '</article>';
}).join(""));

render("services", data.services.map(function (s) {
  return '<article class="card">' +
    '<strong>' + s + '</strong>' +
    '<span class="pill">placeholder</span>' +
  '</article>';
}).join(""));

render("settings", data.settings.map(function (s) {
  return '<div class="card">' + s + '</div>';
}).join(""));

render("blockers", data.blockers.map(function (b) {
  return "<li>" + b + "</li>";
}).join(""));
`;
}

for (const bank of banks) {
  const repoDir = join(DEV, bank.slug);
  const srcDir = join(repoDir, 'src');

  if (!existsSync(srcDir)) {
    mkdirSync(srcDir, { recursive: true });
  }

  writeFileSync(join(repoDir, 'index.html'), generateIndexHtml(bank));
  writeFileSync(join(repoDir, 'package.json'), generatePackageJson(bank));
  writeFileSync(join(srcDir, 'styles.css'), generateStylesCss(bank));
  writeFileSync(join(srcDir, 'app.js'), generateAppJs(bank));

  console.log(`Generated: ${bank.slug} (${bank.id} - ${bank.name})`);
}

console.log('\nAll 13 banking prototypes generated.');
