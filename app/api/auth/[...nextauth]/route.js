import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { User, FavSong } from "../../../../models/user";
import connectMongo from "../../../../lib/mongodb";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;

        try {
          await connectMongo();
          console.log("hu");
          const userExists = await User.findOne({ email });
          console.log("hu");
          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log("it", error);
        }
      }

      return user;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
