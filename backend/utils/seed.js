require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Article = require("../models/Article");

const sampleArticles = [
  {
    title: "10 Superfoods to Kickstart Your New Year",
    excerpt:
      "Discover the most nutrient-dense foods that will boost your energy and health in the new year.",
    body: `Starting the new year with the right foods can make all the difference in achieving your health goals. Superfoods are packed with nutrients that support overall wellness.

**1. Blueberries**: Rich in antioxidants, these berries help fight inflammation and support brain health.

**2. Salmon**: Loaded with omega-3 fatty acids, salmon promotes heart health and reduces inflammation.

**3. Kale**: This leafy green is packed with vitamins A, K, and C, plus minerals like calcium and iron.

**4. Quinoa**: A complete protein source that's also rich in fiber and minerals.

**5. Avocado**: Full of healthy fats that support heart health and help you feel satisfied.

**6. Sweet Potatoes**: High in fiber, vitamins, and antioxidants that support immune function.

**7. Walnuts**: Rich in omega-3s and antioxidants that support brain health.

**8. Greek Yogurt**: High in protein and probiotics that support gut health.

**9. Spinach**: Packed with iron, vitamins, and antioxidants.

**10. Green Tea**: Rich in antioxidants and compounds that boost metabolism.

Incorporating these superfoods into your daily diet can help you feel more energized, support your immune system, and maintain a healthy weight throughout the year.`,
    tags: ["nutrition", "superfoods", "health", "wellness"],
    author: "Dr. Sarah Johnson",
    coverImageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
  },
  {
    title: "The Ultimate Guide to Meal Planning for Busy Professionals",
    excerpt:
      "Learn how to plan healthy meals efficiently, even with a packed schedule.",
    body: `Meal planning doesn't have to be complicated. With the right strategies, you can eat healthy meals throughout the week without spending hours in the kitchen.

**Benefits of Meal Planning:**
- Saves time during busy weekdays
- Reduces food waste
- Helps maintain a healthy diet
- Saves money on groceries
- Reduces stress about "what's for dinner"

**Step 1: Choose Your Planning Day**
Pick one day per week (Sunday works for most people) to plan and prep your meals.

**Step 2: Create a Template**
Start with a simple template:
- Breakfast: Overnight oats, smoothies, or egg muffins
- Lunch: Grain bowls, salads, or wraps
- Dinner: Protein + vegetable + grain
- Snacks: Fruits, nuts, yogurt

**Step 3: Batch Cook**
Prepare large quantities of:
- Grains (rice, quinoa)
- Proteins (chicken, beans)
- Roasted vegetables

**Step 4: Invest in Good Containers**
Glass containers with compartments help keep foods fresh and organized.

**Sample Weekly Plan:**
- Monday: Grilled chicken with roasted vegetables and quinoa
- Tuesday: Salmon with sweet potato and broccoli
- Wednesday: Turkey chili with side salad
- Thursday: Stir-fry with tofu and mixed vegetables
- Friday: Baked cod with asparagus and brown rice

Remember, meal planning is flexible. Start simple and adjust based on what works for your lifestyle.`,
    tags: ["meal-planning", "nutrition", "busy-lifestyle", "health"],
    author: "Maria Rodriguez, RD",
    coverImageUrl:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800",
  },
  {
    title: "Understanding Macronutrients: Your Complete Guide",
    excerpt:
      "Break down the science of proteins, carbs, and fats to optimize your nutrition.",
    body: `Understanding macronutrients is essential for creating a balanced diet that supports your health and fitness goals.

**What Are Macronutrients?**
Macronutrients are nutrients your body needs in large amounts to function properly. There are three main types: proteins, carbohydrates, and fats.

**Proteins:**
- Building blocks: Made up of amino acids
- Functions: Build and repair tissues, make enzymes and hormones
- Sources: Meat, fish, eggs, legumes, dairy, nuts
- Daily needs: 0.8-1.2g per kg of body weight

**Carbohydrates:**
- Primary energy source for your body and brain
- Types: Simple (sugars) and complex (starches, fiber)
- Sources: Grains, fruits, vegetables, legumes
- Daily needs: 45-65% of total calories

**Fats:**
- Essential for hormone production and nutrient absorption
- Types: Saturated, unsaturated, trans fats
- Healthy sources: Avocados, nuts, olive oil, fatty fish
- Daily needs: 20-35% of total calories

**Finding Your Balance:**
The ideal macronutrient ratio depends on your goals:
- Weight loss: Higher protein, moderate carbs
- Muscle building: High protein, high carbs
- General health: Balanced approach

**Tracking Tips:**
1. Use a food diary or app
2. Read nutrition labels
3. Measure portions initially
4. Listen to your body's signals

Remember, whole foods naturally provide a balance of macronutrients. Focus on eating a variety of nutrient-dense foods rather than obsessing over exact numbers.`,
    tags: ["nutrition", "macronutrients", "diet", "education"],
    author: "Dr. Michael Chen",
    coverImageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
  },
  {
    title: "Hydration 101: How Much Water Do You Really Need?",
    excerpt:
      "Debunking myths and providing science-based recommendations for optimal hydration.",
    body: `Proper hydration is crucial for every bodily function, yet many people don't drink enough water daily. Let's explore the science behind hydration.

**Why Hydration Matters:**
- Regulates body temperature
- Transports nutrients
- Removes waste products
- Lubricates joints
- Protects organs and tissues
- Maintains blood volume

**How Much Do You Need?**
The "8 glasses per day" rule is overly simplistic. Your needs depend on:
- Body size and weight
- Activity level
- Climate
- Overall health

**General Guidelines:**
- Men: ~3.7 liters (125 oz) per day
- Women: ~2.7 liters (91 oz) per day
- Athletes: Add 1.5-2.5 cups per hour of exercise

**Signs of Dehydration:**
- Dark yellow urine
- Dry mouth and lips
- Headaches
- Fatigue
- Dizziness
- Decreased performance

**Hydration Tips:**
1. Start your day with water
2. Keep a water bottle with you
3. Set reminders on your phone
4. Eat water-rich foods (cucumbers, watermelon, oranges)
5. Drink before you feel thirsty
6. Monitor your urine color (pale yellow is ideal)

**Beyond Water:**
Other hydrating options include:
- Herbal tea
- Coconut water
- Milk
- Fruits and vegetables (contribute ~20% of fluid intake)

**When to Drink More:**
- During exercise
- In hot weather
- When sick (fever, vomiting, diarrhea)
- If pregnant or breastfeeding

Listen to your body and adjust your intake based on your individual needs and circumstances.`,
    tags: ["hydration", "health", "wellness", "water"],
    author: "Jennifer Lee, RD",
    coverImageUrl:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800",
  },
  {
    title: "Intermittent Fasting: Benefits, Methods, and Safety",
    excerpt:
      "An evidence-based look at intermittent fasting and whether it's right for you.",
    body: `Intermittent fasting (IF) has gained popularity as a weight management and health optimization strategy. Let's examine what science says about this eating pattern.

**What Is Intermittent Fasting?**
IF is an eating pattern that cycles between periods of fasting and eating. It doesn't specify which foods to eat, but rather when you should eat them.

**Popular IF Methods:**

**1. 16/8 Method:**
- Fast for 16 hours
- Eat during an 8-hour window
- Most popular and easiest to maintain

**2. 5:2 Diet:**
- Eat normally 5 days per week
- Restrict calories to 500-600 on 2 non-consecutive days

**3. Eat-Stop-Eat:**
- 24-hour fast once or twice per week

**4. Alternate Day Fasting:**
- Alternate between fasting days and eating days

**Potential Benefits:**
- Weight loss and fat loss
- Improved insulin sensitivity
- Reduced inflammation
- Enhanced cellular repair (autophagy)
- May improve heart health
- Could support brain health

**Who Should Avoid IF:**
- Pregnant or breastfeeding women
- Children and teenagers
- People with eating disorders
- Those with certain medical conditions
- Anyone taking medications that require food

**Getting Started:**
1. Choose a method that fits your lifestyle
2. Start gradually
3. Stay hydrated during fasting periods
4. Eat nutritious foods during eating windows
5. Listen to your body

**Common Mistakes:**
- Overeating during eating windows
- Not staying hydrated
- Choosing the wrong method for your lifestyle
- Ignoring hunger and fullness cues

**The Bottom Line:**
IF can be an effective tool for some people, but it's not necessary for health. Focus on overall diet quality, regular physical activity, and sustainable habits. Consult a healthcare provider before starting any new eating pattern.`,
    tags: ["intermittent-fasting", "diet", "weight-loss", "health"],
    author: "Dr. Sarah Johnson",
    coverImageUrl:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800",
  },
  {
    title: "Building a Sustainable Exercise Routine for 2025",
    excerpt: "Create an exercise plan you can stick with all year long.",
    body: `The key to fitness success isn't finding the perfect workout—it's creating a routine you can maintain consistently. Here's how to build sustainable exercise habits.

**Why Sustainability Matters:**
- Consistency beats intensity
- Prevents burnout
- Reduces injury risk
- Becomes part of your lifestyle
- Produces long-term results

**Step 1: Start Small**
Don't try to exercise 7 days a week immediately. Start with:
- 2-3 days per week
- 20-30 minutes per session
- Activities you enjoy

**Step 2: Choose Activities You Enjoy**
You're more likely to stick with exercises you like:
- Dancing
- Swimming
- Hiking
- Cycling
- Yoga
- Team sports
- Strength training

**Step 3: Schedule It**
Treat exercise like any important appointment:
- Choose specific days and times
- Add it to your calendar
- Prepare the night before

**Step 4: Mix It Up**
Variety prevents boredom and works different muscle groups:
- Cardio (running, cycling)
- Strength (weights, bodyweight)
- Flexibility (yoga, stretching)
- Balance (tai chi, stability exercises)

**Sample Weekly Plan:**
- Monday: 30-minute brisk walk
- Tuesday: Strength training (upper body)
- Wednesday: Rest or gentle yoga
- Thursday: 30-minute bike ride
- Friday: Strength training (lower body)
- Saturday: Active recreation (hiking, sports)
- Sunday: Rest or light stretching

**Tips for Success:**
1. Find an accountability partner
2. Track your progress
3. Celebrate small wins
4. Be flexible with your plan
5. Focus on how you feel, not just weight
6. Rest when needed

**Overcoming Barriers:**
- No time: Break into 10-minute chunks
- No energy: Exercise actually increases energy
- No motivation: Focus on showing up, not perfection
- No equipment: Bodyweight exercises work great

Remember, the best exercise routine is one you'll actually do. Start where you are, stay consistent, and adjust as needed.`,
    tags: ["exercise", "fitness", "wellness", "new-year"],
    author: "Carlos Martinez, CPT",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Article.deleteMany();

    console.log("Cleared existing data");

    // Create demo user
    const demoUser = await User.create({
      name: "Demo User",
      email: "demo@wellnewyear.com",
      passwordHash: "Demo123!",
      role: "user",
    });

    console.log("Created demo user");

    // Create dietician user
    const dietician = await User.create({
      name: "Dr. Sarah Johnson",
      email: "sarah@wellnewyear.com",
      passwordHash: "Dietician123!",
      role: "dietician",
    });

    console.log("Created dietician user");

    // Create articles (using save() to trigger pre-save hooks for slug generation)
    const articles = [];
    for (const articleData of sampleArticles) {
      const article = new Article(articleData);
      await article.save();
      articles.push(article);
    }

    console.log(`Created ${articles.length} articles`);

    console.log("\n========================================");
    console.log("Database seeded successfully!");
    console.log("========================================");
    console.log("\nDemo Credentials:");
    console.log("Email: demo@wellnewyear.com");
    console.log("Password: Demo123!");
    console.log("\nDietician Credentials:");
    console.log("Email: sarah@wellnewyear.com");
    console.log("Password: Dietician123!");
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
