import React from "react";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown, HiCurrencyBangladeshi, HiCalendar } from "react-icons/hi";

{/* 
const transactions = [
  {
    id: 1,
    name: "Salary Deposit",
    amount: 5000,
    timestamp: "Today, 9:00 AM",
    type: "credit", // credit or debit
    category: "green",
  },
  {
    id: 2,
    name: "Grocery Shopping",
    amount: -250,
    timestamp: "Yesterday, 6:30 PM",
    type: "debit",
    category: "purple",
  },
];

const stats = [
  {
    title: "Total Balance",
    value: "৳ 9,680",
    icon: HiCurrencyBangladeshi,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Credit",
    value: "৳ 41,100",
    icon: HiTrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Debit",
    value: "৳ 31,420",
    icon: HiTrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "This Month",
    value: "৳ 12,350",
    icon: HiCalendar,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

*/}

const categoryColors = {
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 0,
    totalCredit: 0,
    totalDebit: 0,
    monthBalance: 0,
  });

  useEffect(() => {
    // Fetch transactions when the component is mounted
    axios.get("http://localhost/transactions.php").then((response) => {
      setTransactions(response.data);
      calculateStats(response.data);
    });
  }, []);

  const calculateStats = (transactions) => {
    const totalCredit = transactions
      .filter((transaction) => transaction.type === "credit")
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalDebit = transactions
      .filter((transaction) => transaction.type === "debit")
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalBalance = totalCredit - totalDebit;

    setStats({
      totalBalance,
      totalCredit,
      totalDebit,
      monthBalance: totalBalance, // Update this based on your criteria for monthly balance
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Display stats like Total Balance, Total Credit, Total Debit */}
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;