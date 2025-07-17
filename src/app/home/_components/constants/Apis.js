const BASE_URL = "http://localhost:3001"; // Adjust based on your backend route

export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return await res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
};

export const createCompany = async (companyData) => {
  const res = await fetch(`${BASE_URL}/api/company/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(companyData),
  });
  return await res.json();
};

export const getAllCompanies = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE_URL}/api/company/getAll?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch companies");
  return await res.json();
};

export const getCompanyById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/company/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

export const updateCompany = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/api/company/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  console.log(JSON.stringify(updatedData));
  return await res.json();
};

export const deleteCompany = async (id) => {
  const res = await fetch(`${BASE_URL}/api/company/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

export const searchCompanies = async (query) => {
  const res = await fetch(`${BASE_URL}/api/company/search?query=${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API search failed:", res.status, errorText);
    throw new Error("Failed to search companies");
  }
  return await res.json();
};

export const checkUsernameExists = async (username) => {
  const res = await fetch(
    `${BASE_URL}/api/company/check-username?username=${username}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API check username failed:", res.status, errorText);
    throw new Error("Failed to check username");
  }

  const data = await res.json();
  return data.exists;
};

export const getTopTenCompanies = async () => {
  const res = await fetch(`${BASE_URL}/api/company/top10`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  let result = await res.json();
  if (result.status === 200) {
    return result.data || [];
  }
  else return [];
  // Uncomment the following lines if you want to handle the response differently
  // return await res.json().status == 201 && res.result.json() ? res.json().result : [];
};

export const getTotalCompanies = async () => {
  const res = await fetch(`${BASE_URL}/api/company/totalcompany`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return await res.json();
};

export const getActiveCompanies = async () => {
  const res = await fetch(`${BASE_URL}/api/company/activecompany`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return await res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Logout failed: " + error);
  }

  return await res.json();
};