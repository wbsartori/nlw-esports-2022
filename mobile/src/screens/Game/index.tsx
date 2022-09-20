import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute} from "@react-navigation/native";

import { styles } from "./styles";
import {Background} from "../../components/Background";
import {GameParams} from "../../@types/navigation";

interface RouteParams {
    id: string;
    title: string;
    bannerUrl: string;
}

export function Game(){
    const route = useRoute();
    const game = route.params as GameParams;

    return (
        <Background>
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        </Background>
    );
}