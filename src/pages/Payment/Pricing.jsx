import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Pricing = () => {
  const { user, dbUser } = useAuth();

  if (dbUser?.isPremium) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">You are already Premium ⭐</h1>
      </div>
    );
  }

  const handleUpgrade = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      {
        email: user.email,
      }
    );

    window.location.href = res.data.url;
  };

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Upgrade to Premium
      </h1>

      {/* ✅ Comparison Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Features</th>
              <th>Free</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lesson Access</td>
              <td>Limited</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Premium Lessons</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Ads</td>
              <td>✅</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Priority Listing</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Early Access</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Private Lessons</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Comment Priority</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Lifetime Access</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Stripe Button */}
      <div className="text-center mt-10">
        <button onClick={handleUpgrade} className="btn btn-warning text-lg">
          Upgrade to Premium – ৳1500 (Lifetime)
        </button>
      </div>
    </div>
  );
};

export default Pricing;
