import { useCall } from "@stream-io/video-react-sdk";

export default function useStreamCall() {
  const call = useCall();

  if (!call) {
    throw new Error(
      "useStream must be used within a streamcall component with a valid call prop",
    );
  }
  return call;
}
