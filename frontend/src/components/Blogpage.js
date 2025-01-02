import { Topbar, Single, Write, Homepage, SinglePost } from "./Blog";
import { Routes, Route } from "react-router-dom";  // No need for BrowserRouter
import Back from "./Back";

function Blog() {
  const currentUser = true;
  return (
    <>
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/write" element={<Write />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default Blog;
