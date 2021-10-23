import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser, updateUserProfile } from "../store/action/userAction";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Err, seterror] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success:successUpdate, error:errorUpdate, loading:loadingUpdate } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
      if(!user){
          dispatch({type: "USER_UPDATE_PROFILE_REST"})
          dispatch(detailsUser(userInfo._id));
      }else{
          setName(user.name)
          setEmail(user.email)
      }
  }, [dispatch, userInfo._id,user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        seterror('Password and confirm password are not match')
    }else{
        dispatch(updateUserProfile({userId:user._id,name, email, password}));
    }
  };
  return( 
      <>
       <div className="heading-banner" style={{backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("images/1.jpg")`}}>
        <h1>PROFILE</h1>
    </div>
      <main>
      <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>User Profile</h1>
            </div>
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant="danger">{error}</MessageBox>:
                <>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant="success">Profile Update SuccessFully</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter password"  onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="confirmpassword">Confirm password</label>
                    <input id="confirmpassword" type="password" placeholder="Enter Confirm password"  onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}/>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary">Update</button>
                </div>
                </>
            }
      </form>
  </main>
  </>
  );
}
