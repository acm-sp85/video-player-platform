import { request, GraphQLClient, gql } from 'graphql-request';
// import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const pageSlug = pageContext.query.slug;
  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };

  const data = await graphQLClient.request(query, variables);
  const video = data.video;

  return {
    props: {
      video,
    },
  };
};

const Video = ({ video }) => {
  console.log(video);
  return <div></div>;
};
export default Video;
