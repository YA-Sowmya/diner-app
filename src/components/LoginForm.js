import { supabase } from "../supabaseClient";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";

function LoginForm({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (!error) {
        onSuccess?.();
        setTimeout(() => onClose(), 300);
        toast("Signin successful!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error) {
        onSuccess?.();
        setTimeout(() => onClose(), 300);
        toast("Login successful!");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-md">
        <h2 className="text-2xl md:text-3xl lg:text-3xl mb-4 text-center text-primary font-markazi">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4  ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
          />
          <div className="w-full flex justify-center">
            <Button
              className="px-4 mt-4 md:text-xl lg:text-2xl font-markazi"
              type="submit"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 underline"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 block mx-auto text-sm text-gray-600 hover:text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
