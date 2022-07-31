import { GetServerSideProps } from "next";
import Support from "../components/Support";
import Layout from "../components/layout/Layout";

export default function SupportPage() {
    return (
        <Layout title="Support | SlicedAdvice">
            <Support />
        </Layout>
    );
}