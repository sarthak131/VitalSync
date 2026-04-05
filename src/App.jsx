import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("Beginner");
  const [selectedMeal, setSelectedMeal] = useState("High Protein");
  const [dailyCalories, setDailyCalories] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [goal, setGoal] = useState("lose");
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [consumedProtein, setConsumedProtein] = useState(0);
  const [tempCalories, setTempCalories] = useState(0);
  const [tempProtein, setTempProtein] = useState(0);
  const [days, setDays] = useState(30);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
 const sendMessage = () => {
  if (!message.trim()) {
    setResponse("Please ask something first");
    return;
  }

  const msg = message.toLowerCase();

  // 🧈 SPECIFIC FOOD QUESTIONS
  if (msg.includes("butter paneer")) {
    setResponse(
      "Butter paneer is high in fat and calories. You can eat it occasionally in small portions, but avoid it regularly during weight loss ⚠️"
    );
  }

  else if (msg.includes("maggi")) {
    setResponse(
      "Maggi is processed and low in nutrients. It's okay occasionally, but not suitable for fitness goals ❌"
    );
  }

  else if (msg.includes("rice")) {
    setResponse(
      "Rice can be eaten in moderation. Pair it with protein like dal or chicken for a balanced meal 🍚"
    );
  }

  // 💪 PROTEIN / MUSCLE
  else if (msg.includes("protein") || msg.includes("muscle")) {
    setResponse(
      "Great protein sources: Paneer, eggs, chicken, dal, soy, and milk. Aim for 1.5–2g per kg body weight 💪"
    );
  }

  // 🥗 WEIGHT LOSS
  else if (msg.includes("weight loss") || msg.includes("fat loss")) {
    setResponse(
      "For weight loss: Maintain calorie deficit, avoid fried food, and eat fruits, vegetables, and high-protein meals 🥗"
    );
  }

  // 🏋️ WORKOUT
  else if (msg.includes("workout") || msg.includes("exercise")) {
    setResponse(
      "Beginner workout: Pushups (10), Squats (15), Plank (30 sec) — repeat 3 sets daily 💪"
    );
  }

  // 🧠 FULL PLAN
  else if (msg.includes("plan")) {
    setResponse(
      "Basic plan: Morning workout + balanced diet (protein + carbs) + proper sleep (7–8 hrs). Consistency is key 🔥"
    );
  }

  // 🍽️ DIET
  else if (msg.includes("diet")) {
    setResponse(
      "Healthy diet: Breakfast (oats/upma), Lunch (roti + sabzi + dal), Dinner (light meal like khichdi or paneer) 🍽️"
    );
  }

  // 🥚 EGGS
  else if (msg.includes("egg")) {
    setResponse(
      "Eggs are excellent protein source. 2–4 eggs daily can help in muscle building 🥚"
    );
  }

  // 🔥 BELLY FAT
  else if (msg.includes("belly fat")) {
    setResponse(
      "To reduce belly fat: Combine cardio + strength training + calorie deficit 🔥"
    );
  }

  // DEFAULT (SMART RESPONSE)
  else {
    setResponse(
      "Focus on consistency, balanced diet, and regular workouts. Small daily habits lead to big results 💪"
    );
  }

  setMessage("");
};

  const calculatePlan = () => {
    const w = parseFloat(weight);
    const tw = parseFloat(targetWeight);
    const d = parseFloat(days);

    if (!w || !tw || !d) {
      setResult("Please fill all fields");
      return;
    }

    const weightDiff = tw - w;
    const dailyChange = weightDiff / d;

    let maintenance = w * 30;

    let calories =
      dailyChange < 0
        ? maintenance - 500 // fat loss
        : maintenance + 300; // muscle gain

    let protein = w * 2;

    setDailyCalories(Math.round(calories));
    setDailyProtein(Math.round(protein));

    setResult(
      `Daily target: ${Math.round(calories)} kcal | Protein: ${Math.round(protein)}g | Change: ${dailyChange.toFixed(2)} kg/day`,
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900 to-black shadow-lg">
        <h1 className="text-xl font-bold text-green-400">VitalSync AI 💪</h1>
        <div className="space-x-4 text-gray-300">
          <button className="hover:text-white">Dashboard</button>
          <button className="hover:text-white">Workout</button>
          <button className="hover:text-white">Meals</button>
          <button className="hover:text-white">Tracker</button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-500 px-4 py-2 rounded mb-4"        
        >
          Set Fitness Goal 🎯
        </button>
        {showForm && (
          <div className="bg-gray-800 p-4 rounded mt-4">
            <h3 className="mb-2">Enter Your Details</h3>

            <input
              placeholder="Current Weight (kg)"
              className="p-2 w-full mb-2 text-white bg-gray-700"
              onChange={(e) => setWeight(e.target.value)}
            />

            <input
              placeholder="Target Weight (kg)"
              className="p-2 w-full mb-2 text-white bg-gray-700"
              onChange={(e) => setTargetWeight(e.target.value)}
            />
            <input
              placeholder="Time to achieve (days)"
              className="p-2 w-full mb-2 text-white bg-gray-700"
              onChange={(e) => setDays(e.target.value)}
            />

            <select
              className="p-2 w-full mb-2 text-white bg-gray-700"
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="lose">Weight Loss</option>
              <option value="gain">Muscle Gain</option>
            </select>

            <button
              onClick={calculatePlan}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Create My Plan 🚀
            </button>

            <p className="mt-2 text-green-400">{result}</p>
            <p className="text-blue-400">
              You need to {goal === "lose" ? "lose" : "gain"}{" "}
              {Math.abs((targetWeight - weight) / days).toFixed(2)} kg per day
            </p>
          </div>
        )}
        <h2 className="text-2xl mb-4">Dashboard</h2>
        <p className="text-gray-400 mb-4">
          Your AI-powered fitness & nutrition assistant
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="mb-2">Nutrition Tracker 📊</h3>

            <p className="text-yellow-400">
              Target: {dailyCalories} kcal | {dailyProtein}g protein
            </p>

            <input
              value={tempCalories}
              placeholder="Calories eaten"
              className="p-2 w-full mb-2 text-white bg-gray-700"
              onChange={(e) => setTempCalories(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setConsumedCalories(tempCalories);
                  setConsumedProtein(tempProtein);

                  setTempCalories("");
                  setTempProtein("");
                }
              }}
            />

            <input
              value={tempProtein}
              placeholder="Protein eaten (g)"
              className="p-2 w-full mb-2 text-white bg-gray-700"
              onChange={(e) => setTempProtein(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setConsumedCalories(tempCalories);
                  setConsumedProtein(tempProtein);

                  setTempCalories("");
                  setTempProtein("");
                }
              }}
            />
            <button
              onClick={() => {
                setConsumedCalories(Number(tempCalories));
                setConsumedProtein(Number(tempProtein));

                // 👇 CLEAR INPUT
                setTempCalories("");
                setTempProtein("");
              }}
              className="bg-green-500 px-4 py-2 rounded mt-2"
            >
              Track Meal ✅
            </button>

            <p className="mt-2 text-green-400">
              Consumed: {consumedCalories}/{dailyCalories} kcal
            </p>

            <p className="text-green-400">
              Protein: {consumedProtein}/{dailyProtein}g
            </p>
            <p className="mt-2 text-sm text-gray-300">Protein Progress</p>

            <div className="mt-1">
              <div className="bg-gray-700 h-4 rounded">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{
                    width: `${
                      dailyProtein ? (consumedProtein / dailyProtein) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>

              <p className="mt-1 text-sm text-gray-300">
                {dailyProtein
                  ? Math.round((consumedProtein / dailyProtein) * 100)
                  : 0}
                % completed
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-300">Calories Progress</p>
            <div className="mt-3">
              <div className="bg-gray-700 h-4 rounded">
                <div
                  className="bg-green-500 h-4 rounded"
                  style={{
                    width: `${
                      dailyCalories
                        ? (consumedCalories / dailyCalories) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-300">
              {dailyCalories
                ? Math.round((consumedCalories / dailyCalories) * 100)
                : 0}
              % completed
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>Workout Plan 💪</h3>

            <select
              className="bg-gray-700 p-2 rounded mt-2"
              onChange={(e) => setSelectedWorkout(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <div className="mt-3 text-green-400">
              {selectedWorkout === "Beginner" && (
                <p>💪 Pushups, Squats, Plank (3 sets each)</p>
              )}

              {selectedWorkout === "Intermediate" && (
                <p>🔥 Pull-ups, Lunges, Burpees (4 sets each)</p>
              )}

              {selectedWorkout === "Advanced" && (
                <p>🏋️ Deadlift, Bench Press, HIIT (5 sets)</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>Meal Suggestions 🍽️</h3>

            <select
              className="bg-gray-700 p-2 rounded mt-2"
              onChange={(e) => setSelectedMeal(e.target.value)}
            >
              <option>High Protein</option>
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
            </select>

            {/* 👇 ADD THIS (STEP 5) */}
            <div className="mt-3 text-green-400">
              {selectedMeal === "High Protein" && (
                <p>🍗 Eggs, Chicken, Paneer, Dal</p>
              )}

              {selectedMeal === "Weight Loss" && (
                <p>🥗 Oats, Fruits, Salad, Green Tea</p>
              )}

              {selectedMeal === "Muscle Gain" && (
                <p>🍗 Chicken, Eggs, Rice, Milk, Peanut Butter</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>Progress</h3>
            <p>Week 1</p>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="mt-6 bg-gray-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-xl mb-2 text-green-400">AI Fitness Coach 🤖</h3>

          <input
            className="p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Ask about diet or workout..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full"
          >
            Ask AI 🚀
          </button>

          <p className="mt-3 text-yellow-300">
            {loading ? "Thinking... 🤖" : response}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
