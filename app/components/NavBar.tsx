"use client";
import Link from "next/link";
import { useContext } from "react";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

type Props = {};

const NavBar = (props: Props) => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>

      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-xsm">{data?.email}</span>

                <button
                  className="bg-blue-400 text-white border p-1 px-4 rounded mr-3 "
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
