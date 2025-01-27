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

