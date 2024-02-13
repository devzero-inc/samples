export async function getPosts() {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
      });
      const data = await response.json();
      return data.posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function getVotes(id: string| undefined) {
    try {
      const response = await fetch(`/api/posts?postId=${id}`, {
        method: "POST",
      });
      const data = await response.json();
      return data.votes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function doVote(token: string, id: string, userID: string, type: string) {
    try {
      const formData = new FormData();
      formData.append("postId", id);
      formData.append("userId", userID);
      formData.append("type", type);
  
      const response = await fetch(`/api/vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function createUser(
    name: string,
    email: string,
    password: string
  ) {
    try {
      const newFormData = new FormData();
      newFormData.append("name", name);
      newFormData.append("email", email);
      newFormData.append("password", password);
  
      const response = await fetch("/api/user", {
        method: "POST",
        body: newFormData,
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function loginUser(email: string, password: string) {
    try {
      const newFormData = new FormData();
      newFormData.append("email", email);
      newFormData.append("password", password);
  
      const response = await fetch("/api/user?login=yes", {
        method: "POST",
        body: newFormData,
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }