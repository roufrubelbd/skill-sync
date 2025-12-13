import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Pricing = () => {
  const { user } = useAuth();


  if (user?.isPremium) {
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
      <div className=" ">
        <div>
          <h1 className="text-xl font-bold text-center text-info uppercase">
            Upgrade to Premium
          </h1>
        </div>

        {/*  Stripe Button */}
        <div className="my-4 ">
          <button
            onClick={handleUpgrade}
            className="btn btn-sm px-4 btn-warning hover:btn-info hover:text-white rounded-full shadow"
          >
            Upgrade to Premium ৳1500 (Lifetime)
          </button>
        </div>
      </div>

      {/*  Comparison Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="md:font-bold md:text-lg">
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
    </div>
  );
};

export default Pricing;
