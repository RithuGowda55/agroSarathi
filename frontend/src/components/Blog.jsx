import React, { useState, useEffect } from "react";
import { Link, useLocation ,useParams,useNavigate} from 'react-router-dom';
import '../css/blog.css';
import axios from "axios";
import "../css/SinglePost.css";
import styled from "styled-components";
import Back from "./Back";
import { Toolbar } from "@material-ui/core";


function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(null); // To show the image preview

  const navigate = useNavigate(); // Import and use the `useNavigate` hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (img) {
      formData.append("img", img);
    }

    try {
      const res = await axios.post("http://localhost:8090/api/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      console.log(res.data); // The saved post data
      navigate("/home"); // Route to the Home page
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create an object URL for the preview
    }
  };

  return (
    <>
    <Back title='Write the Blog' />
    <Topbar />
    <div style={styles.container}>
      <br /><br />
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="fileInput" style={styles.fileLabel}>
            <i className="fas fa-plus" style={styles.icon}></i> Add Image
          </label>
          <input
            id="fileInput"
            type="file"
            style={styles.fileInput}
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview} alt="Preview" style={styles.previewImage} />
          )}
        </div>
        <div style={styles.formGroup}>
          <input
            style={styles.input}
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>
        <div style={styles.formGroup}>
          <textarea
            style={styles.textarea}
            placeholder="Tell your story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button style={styles.button} type="submit">
          Publish
        </button>
        {success && <span style={styles.successMessage}>Post has been published!</span>}
      </form>
    </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    width: "100%",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fileLabel: {
    cursor: "pointer",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "14px",
    marginBottom: "10px",
  },
  fileInput: {
    display: "none",
  },
  icon: {
    marginRight: "5px",
  },
  previewImage: {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    borderRadius: "8px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    resize: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  successMessage: {
    marginTop: "10px",
    color: "green",
    fontSize: "14px",
  },
};




function Topbar() {
  const styles = {
    top: {
      width: "100%",
      height: "50px",
      backgroundColor: "white",
      position: "sticky",
      top: "0",
      display: "flex",
      alignItems: "center",
      zIndex: 999,
      fontFamily: '"Josefin Sans", sans-serif',
    },
    topLeft: {
      flex: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    topIcon: {
      fontSize: "20px",
      marginRight: "10px",
      color: "#444",
      cursor: "pointer",
    },
    topCenter: {
      flex: 6,
    },
    topList: {
      display: "flex",
      justifyContent: "center",
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    topListItem: {
      marginRight: "20px",
      fontSize: "18px",
      fontWeight: 300,
      cursor: "pointer",
    },
    topListItemHover: {
      color: "gray",
    },
  };

  return (
    <div style={styles.top}>
      {/* Social Media Icons */}
      <div style={styles.topLeft}>
        <a
          href="https://www.facebook.com/ModernFarmerMagazine"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-square" style={styles.topIcon}></i>
        </a>
        <a
          href="https://www.instagram.com/modernfarmer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram-square" style={styles.topIcon}></i>
        </a>
        <a
          href="https://www.pinterest.com/modernfarmer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-pinterest-square" style={styles.topIcon}></i>
        </a>
        <a
          href="https://twitter.com/ModFarm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter-square" style={styles.topIcon}></i>
        </a>
      </div>

      {/* Navigation Links */}
      <div style={styles.topCenter}>
        <ul style={styles.topList}>
          <li
            style={styles.topListItem}
            onMouseEnter={(e) => (e.target.style.color = styles.topListItemHover.color)}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            <Link className="link" to="/home">
              Blog Page
            </Link>
          </li>
          <li
            style={styles.topListItem}
            onMouseEnter={(e) => (e.target.style.color = styles.topListItemHover.color)}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            <Link className="link" to="/write">
              Write Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


// SinglePost Component

// Sidebar Component


function Sidebar() {
  return (
    <div className="sidebar">
      {/* About Me Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT OUR PROJECT</span>
        <img
          src="https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Farming"
        />
        <p>
          Our project promotes modern farming practices by sharing innovative
          techniques, sustainable methods, and technology-driven solutions to
          enhance agricultural productivity and efficiency.
        </p>
      </div>

      {/* Categories Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=SustainableFarming">
              Sustainable Farming
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=AgriTech">
              AgriTech
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=OrganicFarming">
              Organic Farming
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=CropManagement">
              Crop Management
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=PrecisionAgriculture">
              Precision Agriculture
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Hydroponics">
              Hydroponics
            </Link>
          </li>
        </ul>
      </div>

      {/* Follow Us Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a
            href="https://www.facebook.com/ModernFarmerMagazine"
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </a>
          <a
            href="https://www.instagram.com/modernfarmer/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </a>
          <a
            href="https://www.pinterest.com/modernfarmer/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="sidebarIcon fab fa-pinterest-square"></i>
          </a>
          <a
            href="https://twitter.com/ModFarm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}




const SinglePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SinglePostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const SinglePostDesc = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SinglePostEdit = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #555;
    }
  }

  button:first-child {
    background-color: #007bff;
  }

  button:last-child {
    background-color: #dc3545;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  
  input, textarea {
    padding: 12px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    transition: border 0.3s ease;
  }

  input:focus, textarea:focus {
    border-color: #007bff;
  }

  button[type="submit"] {
    padding: 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: #218838;
  }
`;

function SinglePost() {
  const { id: postId } = useParams();  // Extracting the 'id' param from the URL
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8090/api/posts/${postId}`);
        setPost(res.data);
        setFormData({ title: res.data.title, description: res.data.description });
      } catch (err) {
        console.error("Error fetching post:", err);
        alert("Failed to load post");
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8090/api/posts/${postId}`);
      alert("Post deleted successfully");
      window.location.replace("/home"); // Redirect to the homepage after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8090/api/posts/${postId}`, formData);
      setPost(res.data);
      setIsEditing(false); // Exit editing mode
      alert("Post updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <>
    <Back title='Edit/Delete the Blog' />
    <Topbar />
    <SinglePostWrapper>
      <PostImg
        src={post.img ? `http://localhost:8090/${post.img}` : "/placeholder.jpg"}
        alt="Post"
      />
      {isEditing ? (
        <EditForm onSubmit={handleUpdate}>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
          <button type="submit">Update</button>
        </EditForm>
      ) : (
        <>
          <SinglePostTitle>{post.title}</SinglePostTitle>
          <SinglePostDesc>{post.description}</SinglePostDesc>
          <SinglePostEdit>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </SinglePostEdit>
        </>
      )}
    </SinglePostWrapper>
    </>
  );
}



// Posts Component
function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8090/api/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}


// Single Component
function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}

export default Single;

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
      <span className="headerTitleSm">Modern Farming & Technology</span>
      <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}

function Post({ post }) {
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.img ? `http://localhost:8090/${post.img}` : "/placeholder.jpg"}
        alt="Post"
      />
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.description.substring(0, 100)}...</p>
    </div>
  );
}




// Single Component

// Homepage Component
function Homepage() {
  const location = useLocation();
  console.log(location);
  return (
    <>
    <Back title='User Stories' />
    <Topbar />
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}

export { Homepage, Single, Write, Header, Post, Posts, Sidebar, Topbar,SinglePost };
