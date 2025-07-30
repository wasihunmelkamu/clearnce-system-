import React, { useRef, useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { useParams } from "react-router-dom";
import useFetch from "../../api/useFetch";
import html2pdf from "html2pdf.js";
import Spinner from "../../components/ui/Spinner";
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
          አዲስ አበባ ሳይንስ እና ቴክኖሎጂ ዩኒቨርሲቲ <br />
          ADDIS ABABA SCIENCE & TECHNOLOGY UNIVERSITY{" "}
        </h2>{" "}
        <p className="text-center font-semibold">
          <br /> <strong>የስራ ልምድ ደብዳቤ</strong>{" "}
        </p>
        <br />{" "}
        <p className="text-center font-semibold">
          {" "}
          <strong>TO WHOM IT MAY CONCERN</strong>{" "}
        </p>{" "}
        {staffDetail ? (
          <div className="text-xl text-justify ">
            <li className="list-none text-right font-bold mr-18">
              Ref. No: <input />{" "}
            </li>{" "}
            <li className="list-none text-right font-bold mr-18">
              Date: <input />{" "}
            </li>{" "}
            Our Academic staff member Mrs/Ms. {staffDetail.fname}{" "}
            {staffDetail.sname} {staffDetail.lname} requested our office to
            write a letter about his/her work experience through an application
            dated on {staffDetail.cleared_date.split("T")[0]}. Accordingly, we
            certify that she has been working in our University in{" "}
            {staffDetail.education_field}. From Oct 09, 2014 G.C up to October
            18, 2018 G.C on the position of Lecturer. From October 19, 2018 G.C
            up to October 17, 2022 G.C on Study leave for (PhD) program. From
            October 18, 2022 G.C Until now she has been working on the position
            of Lecturer. On a permanent basis and earning a gross monthly salary
            of birr {staffDetail.salary} only. In addition to her academic
            responsibility, she served as University-Industry Linkage
            Coordinator from December 21, 2015 G.C till February 21, 2018 G.C.
          </div>
        ) : (
          <Spinner />
        )}
        <div className="text-right ">Sincerely</div> <p className="right"></p>{" "}
      </div>{" "}
    </div>
  );
});

const ExperienceLetter = () => {
  const componentRef = useRef(null);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handleDownload = () => {
    if (componentRef.current) {
      const element = componentRef.current;
      html2pdf().from(element).save("ExperienceLetter.pdf");
    }
  };

  return (
    <Wrapper>
      <TitleBar title="Experience Letter" />{" "}
      <div>
        <ComponentToPrint ref={componentRef} />{" "}
        <Button
          className="py-2 text-center hover:text-white ml-9"
          variant="outline"
          onClick={handleDownload}
        >
          Download the Letter
        </Button>
        {/* <button
          className="bg-sideBarColor text-white font-bold text-2xl m-6"
          onClick={handleDownload}
        >
          Download the Letter
        </button>{" "} */}
      </div>{" "}
    </Wrapper>
  );
};

export default ExperienceLetter;
