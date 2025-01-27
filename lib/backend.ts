import axios from "axios";

export async function fetchBlogs() {
  try {
    const blogs = await axios.get(
      `${process.env.BACKEND}/blogs?sort=createdAt&populate=*`
    );
    const blogData = blogs?.data?.data;
    return blogData;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchBlogsById({ id }: { id: string }) {
  try {
    const res = await fetch(`${process.env.BACKEND}/blogs/${id}?populate=*`);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
}

export async function fetchNewBlogs() {
  try {
    const blogs = await axios.get(
      `${process.env.BACKEND}/new-blogs?sort=createdAt&populate=*`
    );
    const blogData = blogs?.data?.data;
    return blogData;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchNewBlogsById({ id }: { id: string }) {
  try {
    const res = await fetch(`${process.env.BACKEND}/new-blogs/${id}?populate=*`);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
}

export const getHotBlogs = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND}/hotblogs?populate=*`);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
};

export async function fetchHotBlogsById({ id }: { id: string }) {
  try {
    const res = await fetch(`${process.env.BACKEND}/hotblogs/${id}?populate=*`);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
}

export async function TrendingBlogs() {
  try {
    const res = await fetch(
      `${process.env.BACKEND}/blogs?sort=createdAt&populate=*`
    );
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${process.env.BACKEND}/trend-blogs?populate=*`);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
}

export async function fetchProductsById({ id }: { id: string }) {
  try {
    const res = await fetch(
      `${process.env.BACKEND}/trend-blogs/${id}?populate=*`
    );
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Fetch failed" };
  }
}
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND}/blogscategories?populate=*`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    const categoryNames = data.data.map((category: any) => category.attributes.category);
    return ["All", ...categoryNames]; // Add "All" as the default category
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ["All"]; // Return "All" as the fallback
  }
};


// sitemap
export async function fetchSiteMapBlogs() {
  try {
    const { data } = await axios.get(`${process.env.BACKEND}/blogs?populate=*`);
    const posts = data?.data?.map(({ attributes }: any) => ({
      slug: attributes.slug,
      createdAt: attributes.createdAt,
    }));

    const post = posts.map(({ slug, createdAt }: any) => {
      return { slug, createdAt };
    });

    return post;
  } catch (error) {
    console.error(error);
  }
}

