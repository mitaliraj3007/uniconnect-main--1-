import mongoose from "mongoose";
import dotenv from "dotenv";
import faker from "faker";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB Atlas");

    await User.deleteMany({});
    await Post.deleteMany({});

    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        profilePic: faker.image.avatar(),
      });
    }

    const createdUsers = await User.insertMany(users);
    console.log(`👥 Created ${createdUsers.length} users`);

    const posts = [];
    for (let i = 0; i < 40; i++) {
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      posts.push({
        user: randomUser._id,
        content: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos(),
        createdAt: new Date(),
      });
    }

    await Post.insertMany(posts);
    console.log(`📝 Created ${posts.length} posts`);

    console.log("🎉 Database successfully seeded!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();