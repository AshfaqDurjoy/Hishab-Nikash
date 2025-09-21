import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }


  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/transactions/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const totalCredit = data
          .filter(tx => tx.type === "Credit")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);
        const totalDebit = data
          .filter(tx => tx.type === "Debit")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);
        setTotalBalance(totalCredit - totalDebit);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [user.id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <FaUser className="text-gray-500 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <FaEnvelope className="text-gray-500 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>

         <div className="flex items-center gap-3 border p-4 rounded-lg">
  <span className="text-gray-500 w-6 h-6 text-lg">💰</span>
  <div>
    <p className="text-gray-500 text-sm">Current Total Balance</p>
    <p className="font-semibold">৳ {totalBalance.toLocaleString()}</p>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
