import React, { useState } from "react";
import Link from "next/link";
import { createMembershipPlan } from "../../../constants/appRoutes";
import { useGetMembershipsQuery } from "../services/membership.services";
import MembershipCard from "./MembershipCard";
import { AppPagination } from "../../../components";

const Memberships = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetMembershipsQuery({ page: pageNumber });

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="bg-[#141414] col-span-12 py-3">
          <Link href={createMembershipPlan}>
            <button className="text-white mx-4 no_bs_creator_button_variant_0 py-1 px-5 float-right">
              Add a plan
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-3 gap-12 my-20">
        {!isLoading &&
          data?.results?.map((membershipData, index) => (
            <div key={index} className="min-h-[100%]">
              <MembershipCard
                isLoading={isLoading}
                membershipData={membershipData}
              />
            </div>
          ))}
      </div>

      {!isLoading && (
        <AppPagination
          onNextClick={() => {
            setPageNumber(pageNumber + 1);
          }}
          onPreviousClick={() => {
            setPageNumber(pageNumber - 1);
          }}
          previousPageNumber={data?.previous?.page}
          nextPageNumber={data?.next?.page}
        />
      )}
    </div>
  );
};

export default Memberships;
