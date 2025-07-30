import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Wrapper from "./Wrapper";
import { useParams } from "react-router-dom";
import useFetch from "../../api/useFetch";
import html2pdf from "html2pdf.js";
import Button from "../../components/ui/Button";
import TitleBar from "../../components/layout/TitleBar";

const ComponentToPrint = React.forwardRef((props, ref) => {
  const { id } = useParams();
  const staffId = parseInt(id);
  const { data, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/cleared`);
  const [staffDetail, setStaffDetail] = useState(null);

  useEffect(() => {
    get("/get");
  }, [get]);

  useEffect(() => {
    if (data?.message && Array.isArray(data.message)) {
      const found = data.message.find((staff) => staff.id === staffId);
      setStaffDetail(found || null);
    }
  }, [data, staffId]);

  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    hireDate: "",
    level: "",
    salary: "",
    dept: "",
    program: "",
    field: "",
    empId: "",
    serviceYears: "",
    leaveStart: "",
    leaveEnd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relativeCSS m-16" ref={ref}>
      {" "}
      <style type="text/css" media="print">
        {"@page { size: portrait; }"}{" "}
      </style>
      <div className="flash" />{" "}
      <div ref={formRef} className="memo-paper">
        {" "}
        <h2 className="text-center font-bold text-2xl">
          አዲስ አበባ ሳይንስ እና ቴክኖሎጂ ዩኒቨርሲቲ <br /> ADDIS ABABA SCIENCE & TECHNOLOGY
          UNIVERSITY{" "}
        </h2>{" "}
        <p className="text-center font-semibold">
          <strong>INTER-OFFICE MEMO</strong>
          <br /> <strong>የስራ መልቀቂያ ደብዳቤ</strong>{" "}
        </p>
        <br /> <p className="text-center font-semibold"> </p>{" "}
        <li className="list-none text-right font-bold mr-18">
          Ref. No: <input />{" "}
        </li>{" "}
        <li className="list-none text-right font-bold mr-18">
          Date: <input />{" "}
        </li>{" "}
        <div className="text-center font-bold">
          ጉዳዩ:- የስራ መልቀቂያ መስጠትን ይመከታል፤
        </div>{" "}
        {staffDetail ? (
          <ol>
            <div>
              ከላይ በእርሱ እንደተገለጸው በዩኒቨርሲቲያችን ውስጥ ከዚህ በታች በተገለጸው የግል ማህደር ውስጥ
              የተገለጹት የስራ መልቀቂያ እንዲስጥዎት በማመልከቻ ጠይቀዋል።
            </div>
            <div className="text-left ">በዚሁ መሰረት የሰራተኛውን/ዋን የግል ማህደር በማየት፤</div>
            <br />{" "}
            <div className="ml-24">
              <li>
                1. ሙሉ ስም፡ {staffDetail.fname} {staffDetail.sname}{" "}
                {staffDetail.lname}{" "}
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />{" "}
              </li>{" "}
              <li>2. የትውልድ ቀን፡ {staffDetail.birthdate.split("T")[0]} </li>{" "}
              <li>3. የቅጥር ቀን፡ {staffDetail.employment_date.split("T")[0]} </li>{" "}
              <li>4. የትምህርት ደረጃ (Level)፡ {staffDetail.educational_level} </li>{" "}
              <li>5. የወርሃዊ ደመወዝ፡ {staffDetail.salary} </li>{" "}
              <li>
                6. የሚሰሩበት ክፍል (Department)፡ {staffDetail.education_field}{" "}
              </li>{" "}
              <li>7. የስራ መደብ: {staffDetail.position} </li>{" "}
              <li>8. የሠራተኛ መለያ ቁጥር፡ {staffDetail.pension_number} </li>{" "}
              <li>
                9. አገልግሎት ዘመን፡ {staffDetail.last_time_salary.split("T")[0]}{" "}
                <input
                  name="serviceYears"
                  value={formData.serviceYears}
                  onChange={handleChange}
                />{" "}
              </li>{" "}
              <li>10. የለቀቁበት ቀን፡ {staffDetail.cleared_date.split("T")[0]} </li>{" "}
            </div>
            <br />
            <p>
              ከ {staffDetail.cleared_date.split("T")[0]} ጀምሮ ከዩኒቨርሲቲያችን ጋር
              የነበራቸው የስራ ውል የተቋረጠ መሆኑን እንገልጻለን።
            </p>{" "}
            <div className="text-right">ከሠላምታ ጋር</div>{" "}
          </ol>
        ) : (
          <p>Loading staff details...</p>
        )}
      </div>{" "}
    </div>
  );
});

const LeavingLetter = () => {
  const componentRef = useRef(null);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "SuperFileName",
  });

  const handleDownload = () => {
    if (componentRef.current) {
      const element = componentRef.current;
      html2pdf().from(element).save("LeavingLetter.pdf");
    }
  };

  return (
    <Wrapper>
      <TitleBar title="Leaving Letter" />
      <div>
        <ComponentToPrint ref={componentRef} />{" "}
        <Button
          className="py-2 text-center hover:text-white ml-9"
          variant="outline"
          onClick={handleDownload}
        >
          Download the Letter
        </Button>
      </div>{" "}
    </Wrapper>
  );
};

export default LeavingLetter;
