import noProjectsImgPath from "../../assets/no-projects.png";
import CustomButton from "../Shared/CustomButton";
export default function NoProjects({ onCreateProject }) {
  return (
    <div className="text-cyan-600 mt-18 w-2/3 flex flex-col items-center justify-center">
      <img
        className="w-20 h-20 object-contain mx-auto"
        src={noProjectsImgPath}
        alt="No Projects"
      />
      <h2 className="text-lg font-bold text-cyan-500 my-4">No Projects...</h2>
      <p className="my-2">Select exsiting project</p>
      <p className="my-2">
        <strong>OR</strong>
      </p>
      <p className="my-2">
        <CustomButton onClick={onCreateProject}>
          Create a new project
        </CustomButton>
      </p>
    </div>
  );
}
