import { GetServerSideProps } from "next";
import Team from "../components/Team";
import Layout from "../components/layout/Layout";

export default function TeamPage() {
    return (
        <Layout title="Meet the Team | SlicedAdvice">
            <Team />
        </Layout>
    );
}