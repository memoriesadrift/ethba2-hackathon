"use client";

import { usePrivy } from "@privy-io/react-auth";
import { UserPill } from "@privy-io/react-auth/ui";
import { useAccount } from "wagmi";
import styles from "./connect-wallet-button.module.css";
import { useEffect, useRef } from "react";
import { Wallet } from "lucide-react";
import { formatAddress } from "@/lib/utils";

const useSetZIndexToPopup = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (el) {
      const onMutate: MutationCallback = (mutations) => {
        mutations.forEach((mutation) => {
          const target = mutation.target as Element;
          if (
            target.tagName !== "BUTTON" &&
            target.getAttribute("aria-haspopup") !== "dialog"
          )
            return;

          const controlledId = target.getAttribute("aria-controls");

          if (controlledId) {
            const controlledEl = document.getElementById(controlledId);
            if (controlledEl) {
              controlledEl.style.zIndex = "50";
            }
          }
        });
      };
      const observer = new MutationObserver(onMutate);
      observer.observe(el, {
        attributeFilter: ["aria-controls"],
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  return ref;
};

export const ConnectWalletButton = () => {
  const ref = useSetZIndexToPopup();
  const { ready, authenticated } = usePrivy();
  const { address: userAddress } = useAccount();
  const isLoggedIn = ready && authenticated && userAddress;

  return (
    <div className={styles.container} data-connected={isLoggedIn} ref={ref}>
      <UserPill
        label={
          <>
            <Wallet className="size-4" />
            {!isLoggedIn && (
              <span className="hidden sm:inline">Connect Wallet</span>
            )}
            {isLoggedIn && (
              <span className="hidden sm:inline">
                {formatAddress(userAddress)}
              </span>
            )}
          </>
        }
        ui={{ background: "secondary" }}
      />
    </div>
  );
};
