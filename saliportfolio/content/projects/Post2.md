---
path: SSG-SSR

description: Reservix transformed an MVP into a profitable video streaming platform for some of the 7000+ organizers from its client base who couldn’t host events during the pandemic.
title: Organizers streamed 200+ shows on Reservix's new video platform
image: /images/ssr.webp
date: 10.05.2023
---

## ServerSide vs Static Props

getStaticProps(): A method that tells the Next component to populate props and render into a static HTML page at build time. 
getServerSideProps(): A method that tells the Next component to populate the props and render into a static HTML page at run time.



## When to use getStaticProps or getServerSideProps?
Determining which method to use depends largely on the nature of your page’s data requirements.If you need a lot of dynamic data on your page, it’s more scalable to render your page at run time (SSR), and therefore getServerSideProps would be the preferred method.  Pages built using getServerSideProps for SSR won’t be as fast as SSG, however, it is optimal when compared to utilizing a standard SPA framework.If your page is more simple in nature, such as a blog post, you’ll get a performance boost rendering a static HTML page at build time (SSG), and therefore getStaticProps would be preferred. Pages built using getStaticProps for SSG will be very fast.

## How to use getStaticProps

Remember, NextJs is built on React, so we’re still just coding React components under the hood. 
```javascript 
export default function Home({ BlogsContent }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <BlogSection blogs={BlogsContent} />
      
    </div>
  );
}
export async function getStaticProps() {
  const BlogFiles = fs.readdirSync(path.join("content/Posts"));

  const BlogsContent = BlogFiles.map((BlogFilename) => {
    const markDownBlog = fs.readFileSync(
      path.join("content/Posts", BlogFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownBlog);

    return {
      frontmatter,
      markdownContent,
    };
  }).slice(0, 3);

  return {
    props: {
      BlogsContent,
    },
  };
}
```
We use the getStaticProps when we need to render a page whose data is must be fetched at the build time.
Reviewing the code above, we have a `Home` component that displays a list of Blog items. We're passing the data returned from the getStaticProps to the LatestBlogs which we can use later on.We fetched the data with libraries like: fs, matter, path which helps us to get the matter content from md files.

So, the getStaticProps() serves two purposes in this context:

1. It tells the React framework to render this content at build time. 
2. It populates the data object and sends it to the component as a prop.

## How to use getServerSideProps

We use the getServerSideProps when we need to render a page whose data is must be fetched at the run time.
```javascript 
export default function Home({ BlogsContent }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <BlogSection blogs={BlogsContent} />
      
    </div>
  );
}
export async function getServerSideProps() {
  const BlogFiles = fs.readdirSync(path.join("content/Posts"));

  const BlogsContent = BlogFiles.map((BlogFilename) => {
    const markDownBlog = fs.readFileSync(
      path.join("content/Posts", BlogFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownBlog);

    return {
      frontmatter,
      markdownContent,
    };
  }).slice(0, 3);

  return {
    props: {
      BlogsContent,
    },
  };
}
```

Strikingly similar to our previous example using getStaticProps! In fact, the only difference is the name of the method itself.



## Overview and Conclusion

NextJs offers two ways to render a web page: as a static HTML page rendered at build time (SSG), or as a dynamically rendered page rendered at run time (SSR). These two techniques have huge implications regarding SEO, and it’s important to understand how to implement them using NextJs.