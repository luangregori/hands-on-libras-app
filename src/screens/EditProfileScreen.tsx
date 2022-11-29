import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, SafeAreaView, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Navigation, Route } from '../types';
import { theme } from '../core/theme';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"
import { updateUserApi } from '../services/user';
import { firebase } from '../services/firebase'
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { messages } from '../constants';

type Props = {
  navigation: Navigation;
  route: Route;
};

const Profile = ({ navigation, route }: Props) => {
  const [id, setId] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [image, setImage] = useState(null)
  const [oldPassword, setOldPassword] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false);
  const { infos } = route.params;

  const updateImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    }) as any;

    if (!result.cancelled) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      }) as any;
      console.log('blob', blob)

      const ref = firebase.storage().ref().child(`/accounts/${id}/profile.png`);
      const snapshot = ref.put(blob)

      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true)
        },
        (error) => {
          setUploading(false)
          console.log('error', error)
          blob.close()
          return
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false)
            console.log("Download URL: ", url)
            setImage(result.uri)
            updateUserApi({ image_url: url })
            blob.close()
            return url
          })
        }
      )
    }
  }

  const _onEditPressed = async () => {
    console.log('called with', name.value, email.value, oldPassword.value, password.value)
    let oldPasswordError;
    let passwordError;
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);

    if (oldPassword.value || password.value) {
      oldPasswordError = passwordValidator(oldPassword.value);
      passwordError = passwordValidator(password.value);
    }

    if (emailError || passwordError || nameError || oldPasswordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setOldPassword({ ...oldPassword, error: oldPasswordError });
      return;
    }

    setLoading(true);
    const infos = {
      name: name.value ? name.value : null,
      email: email.value ? email.value : null,
      oldPassword: oldPassword.value ? oldPassword.value : null,
      newPassword: password.value ? password.value : null
    }
    const user = await updateUserApi(infos)

    if (user.id) {
      setName({ value: user.name, error: '' })
      setEmail({ value: user.email, error: '' })
    }

    if (user.error) {
      if (user.error.includes("Invalid Password")) {
        setOldPassword({ ...email, error: messages.wrongPassword });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setId({ value: infos.id, error: '' })
    setName({ value: infos.name, error: '' })
    setEmail({ value: infos.email, error: '' })
    setImage(infos.image_url);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.titleBar} onPress={() => { navigation.navigate('Profile') }} >
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
        </TouchableOpacity>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            {image ?
              <Image source={{ uri: image }} style={styles.image} resizeMode="cover"></Image> :
              <Image source={require("../assets/profile.png")} style={styles.image} resizeMode="center"></Image>
            }
          </View>

          <TouchableOpacity style={styles.add} onPress={updateImage}>
            {uploading ?
              <ActivityIndicator size="large" color={theme.colors.primary} /> :
              <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            }
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Header>Edite suas informações</Header>

          <TextInput
            label="Nome"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />

          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Senha antiga"
            returnKeyType="done"
            value={oldPassword.value}
            onChangeText={text => setOldPassword({ value: text, error: '' })}
            error={!!oldPassword.error}
            errorText={oldPassword.error}
            secureTextEntry
          />

          <TextInput
            label="Nova senha"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : null}

          <Button mode="contained" onPress={_onEditPressed}>
            Editar
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.secondary
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: theme.colors.surface
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    marginTop: 16,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginTop: -3,
    marginRight: 10
  }
});


export default memo(Profile);
