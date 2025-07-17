// import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "@/utils/session";
// // import rateLimit from "next-rate-limit";

//  const protectedRoutes = ["/", "/feed", "/community","/space"];
// const publicRoutes = ["/login", "/signup"];

// // Rate limiter: allow 1000 unique requests per seconds
// // const limiter = rateLimit({
// //   uniqueTokenPerInterval: 100000,
// //   interval: 100 * 1000, // 1 secs
// // });

// export default async function middleware(req: NextRequest) {
//   // 1) Rate limiting
//   // const headers = limiter.checkNext(req, 60);
//   // Pass rate-limit headers to client
//   // const response = NextResponse.next({ headers });
//   const response = NextResponse.next();

//   // 2) Authentication
//   const path = req.nextUrl.pathname;
//   const isProtected = protectedRoutes.includes(path);
//   const isPublic = publicRoutes.includes(path);

//   const token = req.cookies.get("session")?.value;
//   let session = null;
//   if (token) {
//     try {
//       session = await decrypt(token);
//     } catch {
//       console.error("Failed to decrypt session");
//     }
//   }

//   // Redirect unauthenticated users
//   if (isProtected && !session?.userId) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }
//   // Redirect logged-in users away from public routes
//   if (isPublic && session?.userId) {
//     return NextResponse.redirect(new URL("/feed", req.nextUrl));
//   }

//   // 3) Continue to next
//   return response;
// }
