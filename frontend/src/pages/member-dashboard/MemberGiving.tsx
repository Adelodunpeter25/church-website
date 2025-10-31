import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useGiving } from '@/hooks/useGiving';

export default function MemberGiving() {
  const { user } = useAuth();
  const { getMemberGiving, getMemberGivingSummary, createGiving } = useGiving();
  const [givingHistory, setGivingHistory] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: 'tithe',
    amount: '',
    method: 'online'
  });

  useEffect(() => {
    loadGivingData();
  }, []);

  const loadGivingData = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [history, summaryData] = await Promise.all([
        getMemberGiving(user.id, new Date().getFullYear()),
        getMemberGivingSummary(user.id, new Date().getFullYear())
      ]);
      setGivingHistory(history || []);
      setSummary(summaryData || { total: 0 });
    } catch (error) {
      console.error('Error loading giving data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !formData.amount) return;
    try {
      await createGiving({
        member_id: user.id,
        amount: parseFloat(formData.amount),
        type: formData.type,
        method: formData.method,
        date: new Date()
      });
      setFormData({ type: 'tithe', amount: '', method: 'online' });
      loadGivingData();
    } catch (error) {
      console.error('Error creating giving:', error);
    }
  };

  const setQuickAmount = (amount: string) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Giving History</h3>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {givingHistory.length > 0 ? givingHistory.map((giving) => (
                  <tr key={giving.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(giving.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{giving.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ₦{parseFloat(giving.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{giving.method}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No giving history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Give</h3>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giving Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tithe">Tithe</option>
                <option value="offering">Offering</option>
                <option value="missions">Missions</option>
                <option value="building">Building Fund</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['5000', '10000', '25000'].map((amount) => (
                <button 
                  key={amount} 
                  type="button"
                  onClick={() => setQuickAmount(amount)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  ₦{parseInt(amount).toLocaleString()}
                </button>
              ))}
            </div>
            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold cursor-pointer whitespace-nowrap"
            >
              Give Now
            </button>
          </div>
        </form>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">{new Date().getFullYear()} Giving Summary</h4>
          <p className="text-sm text-blue-700">
            Total Given: <span className="font-bold">₦{summary.total.toLocaleString()}</span>
          </p>
          <p className="text-xs text-blue-600 mt-1">Tax statement available in January</p>
        </div>
      </div>
    </div>
  );
}
