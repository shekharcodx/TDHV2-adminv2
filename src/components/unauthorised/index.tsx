import errorIllustration from "@/assets/images/error-illustration.svg";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <>
      <div className="py-2 bg-gradient-to-b bg-primary to-theme-2 dark:from-darkmode-800 dark:to-darkmode-800">
        {/* <ThemeSwitcher /> */}
        <div className="container">
          {/* BEGIN: Unauthorized Page */}
          <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
            <div className="-intro-x lg:mr-20">
              <img
                alt="Unauthorized Access"
                className="w-[450px] h-48 lg:h-auto"
                src={errorIllustration} // fallback to existing if needed
              />
            </div>
            <div className="mt-10 text-white lg:mt-0">
              <div className="font-medium intro-x text-8xl">401</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                Unauthorized Access
              </div>
              <div className="mt-3 text-lg intro-x">
                You do not have the necessary permissions to view this page.
              </div>
              <Button
                onClick={() => navigate("/")}
                className="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
          {/* END: Unauthorized Page */}
        </div>
      </div>
    </>
  );
}

export default Unauthorized;
