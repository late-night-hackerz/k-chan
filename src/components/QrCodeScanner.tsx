import { action } from "@solidjs/router";
import { Accessor, createEffect } from "solid-js";
import { tw } from "twind";
import { randomid } from "../lib/utils";
import QrScanner from "qr-scanner";

export const QrCodeScanner = (props: {
  active: Accessor<boolean>;
  setter: (code: string) => void;
}) => {
  const id = `qr-video-${randomid()}`;
  var scanner: QrScanner;

  createEffect(() => {
    const video = document.getElementById(id) as HTMLVideoElement;

    if (props.active()) {
      scanner = new QrScanner(
        video,
        (result) => {
          if (result.data.startsWith("nsec1")) {
            props.setter(result.data);
          }
        },
        {
          highlightScanRegion: true,
          alsoTryWithoutScanRegion: true,
        }
      );
      scanner.start();
    } else {
      if (scanner) {
        scanner.stop();
      }
    }
  });

  return (
    <>
      {props.active() && (
        <video id={id} class={tw`w-quto h-auto my-3 rounded`}></video>
      )}
    </>
  );
};
