import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GraphQLClient,gql} from 'graphql-request'
import BlogCard from '../components/BlogCard'

const gaphcms =new GraphQLClient(
   "https://api-ap-south-1.hygraph.com/v2/cl75u6z1j5kcu01ujb6go8o02/master"
)

const QUERY = gql`
  {
    posts{
      id,
      title,
      datePublished,
      slug,
      content{
        html
      },
     

       author{
        name,
        avatar{
          url
        }
      }



      coverPhoto{
        url
      }


    }
  }

`

export async function getStaticProps(){
  const {posts} =await gaphcms.request(QUERY);
  return{
    props:{
      posts,
    },

    revalidate:10,
  }
}



export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       

      {
        posts.map(post=>(

          <BlogCard title={post.title} author={post.author} coverPhoto={post.coverPhoto} key={post.id} datePublished={post.datePublished} slug={post.slug} />
        ))
      }



      </main>

      
    </div>
  )
}
