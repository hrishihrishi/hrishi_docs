// This lightweight loading component shows a full-screen loader while the
// document page is being prepared and hydrated for the user.
import { FullscreenLoader } from "@/components/fullscreen-loader";

const LoadingPage = () => {
  return <FullscreenLoader label="Document loading..." />
}
 
export default LoadingPage;
