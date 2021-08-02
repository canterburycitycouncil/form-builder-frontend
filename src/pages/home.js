import { Auth } from 'aws-amplify';
import Layout from '../components/layout';

const Home = () => {
    const signOut = () => {
        Auth.signOut();
    }
    return (
        <Layout title="Home">
            <p>This is home</p>
            <button onClick={e => signOut()}>Sign out</button>
        </Layout>
    )
}

export default Home;