import { exec } from "child_process";

exec("cd uniconnect-backend && npm run dev", { stdio: "inherit" });
exec("cd uniconnect && npm run dev", { stdio: "inherit" });