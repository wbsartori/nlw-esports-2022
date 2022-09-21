import {useEffect, useState} from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from "@react-navigation/native";
import {Entypo} from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import {styles} from "./styles";
import {Background} from "../../components/Background";
import {GameParams} from "../../@types/navigation";
import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {THEME} from "../../theme";
import {Heading} from "../../components/Heading";
import {DuoCard, DuoCardProps} from "../../components/DuoCard";

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack()
    }

    useEffect(() => {
        fetch(`http://192.168.0.100:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data))
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo}/>
                    <View style={styles.right}/>
                </View>
                <Image
                    source={{uri: game.bannerUrl}}
                    resizeMode="cover"
                    style={styles.cover}
                />
                <Heading
                    title={game.title}
                    subtitle="Conente-se e comece a jogar!"
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <DuoCard  data={item}/>
                    )}
                />
            </SafeAreaView>
        </Background>
    );
}