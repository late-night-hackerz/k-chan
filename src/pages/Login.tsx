import { Accessor, Component, createSignal, Setter } from "solid-js";
import { tw } from "twind";
import { login } from "../lib/auth";
import { useNavigate } from "@solidjs/router";
import { Header } from "../components/Header";
import { InputBar } from "../components/InputBar";
import { Button } from "../components/Button";
import QrScanner from "qr-scanner";
import { QrCodeScanner } from "../components/QrCodeScanner";
import { ErrorPopup } from "../components/ErrorBanner";
// import { goto } from "./lib/router";

const LoginStep1 = (props: {
  nsec: Accessor<string>;
  setNsec: Setter<string>;
  setStep: Setter<number>;
  errorMessage: Setter<string>;
}) => {
  const [qrcodeScannerOpen, setQrcodeScannerOpen] = createSignal(false);

  const updateNsec = (value: string) => {
    props.setNsec(value);
  };

  return (
    <>
      <div class={tw`space-y-4 mb-8`} id="login-input-step-1">
        {/* Time Input */}
        <InputBar
          value={props.nsec}
          setValue={props.setNsec}
          placeholder="NSEC Key"
        />

        {/* QR Scanner Section */}
        <div class={tw`flex items-center space-x-4`}>
          <div class={tw`flex-1 h-px bg-gray-700`}></div>
          <span class={tw`text-gray-500 text-sm`}>or</span>
          <div class={tw`flex-1 h-px bg-gray-700`}></div>
        </div>

        <button
          class={tw`w-full py-2 flex items-center justify-center space-x-2
                   bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors
                   focus:(outline-none ring-2 ring-purple-500)
                   border(1 gray-700)`}
          on:click={() => setQrcodeScannerOpen(!qrcodeScannerOpen())}
        >
          <svg
            class={tw`w-5 h-5`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span>Scan QR Code</span>
        </button>
      </div>

      <QrCodeScanner active={qrcodeScannerOpen} setter={updateNsec} />

      <Button
        action={() => {
          if (props.nsec().startsWith("nsec1")) {
            props.setStep(1);
          } else {
            props.errorMessage("Invalid NSEC Key");
          }
        }}
      >Next</Button>
    </>
  );
};

export const Login: Component = () => {
  const [nsec, setNsec] = createSignal("");
  const [currentStep, setCurrentStep] = createSignal(0);
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const navigate = useNavigate();

  const submit = () => {
    login(nsec(), password());
    navigate("/");
  };

  return (
    <div class={tw`text-gray-100 p-8 flex flex-col justify-center`}>
      {/* <InputBar value={password} setValue={setPassword} placeholder="Password" /> */}

      {/* Main Content */}
      <main class={tw`w-[70%] mx-auto`}>
        {error().length != 0 && (
          <ErrorPopup message="Invalid NSEC Key" onClose={() => setError("")} />
        )}
        {currentStep() === 0 && (
          <LoginStep1
            nsec={nsec}
            setNsec={setNsec}
            setStep={setCurrentStep}
            errorMessage={setError}
          />
        )}
        {currentStep() === 1 && (
          <>
            <InputBar
              value={password}
              setValue={setPassword}
              placeholder="Password"
            />
            <br />
            <Button action={submit}>Submit</Button>
          </>
        )}
      </main>
    </div>
  );
};
