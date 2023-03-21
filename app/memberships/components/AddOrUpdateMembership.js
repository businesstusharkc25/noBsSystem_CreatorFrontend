import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetMembershipByIdQuery } from "../services/membership.services";
import useAddOrUpdateMembership from "../hooks/useAddOrUpdateMembership";

const AddOrUpdateMembership = ({ isUpdate = false }) => {
  const pathName = usePathname();
  const id = pathName.replace(/[^0-9]/g, "");

  const { data } = useGetMembershipByIdQuery(id);
  const router = useRouter();

  useEffect(() => {
    setMembershipFormData({
      ...membershipFormData,
      membershipName: data?.result?.membershipName || "",
      price: data?.result?.price || 0,
    });

    if (data?.result?.perks?.length > 0) {
      removePerkField(0);

      data?.result?.perks?.map((perk) => {
        setMembershipPerksArr((prevVal) => [...prevVal, { perk }]);
      });
    }
  }, [data?.result]);

  const [membershipFormData, setMembershipFormData] = useState({
    membershipName: "",
    perks: [],
    price: 0,
    status: "",
  });

  const { addOrUpdateMembership } = useAddOrUpdateMembership();

  const [membershipPerksArr, setMembershipPerksArr] = useState([{ perk: "" }]);

  const addInputPerk = (e) => {
    e.preventDefault();
    setMembershipPerksArr([...membershipPerksArr, { perk: "" }]);
  };

  const removePerkField = (i) => {
    let newFormValues = [...membershipPerksArr];
    newFormValues.splice(i, 1);
    setMembershipPerksArr(newFormValues);
  };

  const handleChange = (i, e) => {
    let newFormValues = [...membershipPerksArr];
    newFormValues[i][e.target.name] = e.target.value;
    setMembershipPerksArr(newFormValues);
  };

  const onFormSubmit = async () => {
    membershipPerksArr.map((perk) => membershipFormData.perks.push(perk.perk));
    await addOrUpdateMembership({ membershipFormData, id, isUpdate });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
    >
      <div className="grid grid-cols-12">
        <div className="bg-[#141414] col-span-12 py-3">
          <div className="flex md:block items-center justify-center float-none md:float-right">
            <button
              onClick={() =>
                setMembershipFormData({
                  ...membershipFormData,
                  status: "active",
                })
              }
              type="submit"
              className="text-white mx-3 md:mx-4 bg-[#1C1B1B] py-0 md:py-1 px-2 md:px-5 rounded-md"
            >
              Done
            </button>
            <button
              onClick={() =>
                setMembershipFormData({
                  ...membershipFormData,
                  status: "draft",
                })
              }
              type="submit"
              className="text-white mx-3 md:mx-4 bg-[#1C1B1B] py-0 md:py-1 px-2 md:px-5 rounded-md"
            >
              Save as draft
            </button>
            <button
              onClick={() => router.back()}
              className="text-white mx-3 md:mx-4 bg-[#590000] py-0 md:py-1 px-2 md:px-5 rounded-md"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 py-0 md:py-12">
        <div className="col-start-2 col-end-12">
          <input
            placeholder="Membership Title"
            name="membershipName"
            type={"text"}
            onChange={(e) =>
              setMembershipFormData({
                ...membershipFormData,
                membershipName: e.target.value,
              })
            }
            value={membershipFormData.membershipName}
            className="p-2 min-w-full text-white rounded bg-[#161616] mt-6 drop-shadow-xl"
          />

          <div className="my-4 md:my-8">
            <div className="grid grid-cols-12 gap-4">
              {membershipPerksArr.map((arrItem, index) => (
                <React.Fragment key={index}>
                  <div className={`col-span-${index <= 0 ? "12" : "11"}`}>
                    <input
                      onChange={(e) => handleChange(index, e)}
                      id={index}
                      placeholder="Membership Perks"
                      name={"perk"}
                      value={arrItem.perk || ""}
                      type={"text"}
                      className="p-2 min-w-full text-white rounded bg-[#161616] drop-shadow-xl"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => removePerkField(index)}
                      className="bg-transparent md:bg-[#161616] rounded text-red-700 col-span-1"
                    >
                      X
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              disabled={membershipPerksArr.length >= 6}
              onClick={addInputPerk}
              className="w-full md:w-fit bg-[#161616] p-2 my-4 rounded text-white disabled:text-black"
            >
              Add another perk
            </button>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            <img
              className="col-span-2 justify-self-center	self-center	"
              src="/assets/illustrations/eth_illustration.png"
              width="30px"
            />

            <input
              name="price"
              type={"number"}
              onChange={(e) =>
                setMembershipFormData({
                  ...membershipFormData,
                  price: parseInt(e.target.value),
                })
              }
              value={membershipFormData.price}
              placeholder="Membership Price"
              className="text-white col-span-10 p-2 rounded bg-[#161616] drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddOrUpdateMembership;
