import { Image, StyleSheet, View } from "react-native"
import Text from "../Text"
import theme from "../../theme"
import { numberToSimplifiedString } from "../../utils/numberToSimplifiedString"

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: theme.colors.contentBackground,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    padding: 10
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 2,
    gap: 5
  },
  statsRowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  statsColumnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 2,
    gap: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  languageText: {
    color: theme.colors.textWhite,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    flexGrow: 0,
    alignSelf: "flex-start"
  }
});

const Statistic = ({ statisticName, count }) => {
  return (
    <View style={styles.statsColumnContainer}>
      <Text fontWeight="bold">{numberToSimplifiedString(count)}</Text>
      <Text color="textSecondary">{statisticName}</Text>
    </View>
  )
}

const RepositoryItem = ({ item, index, separators }) => {
  const stats = [
    { name: "Stars", count: item.stargazersCount },
    { name: "Forks", count: item.forksCount },
    { name: "Reviews", count: item.reviewCount },
    { name: "Rating", count: item.ratingAverage },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={styles.image}
        />
        <View style={styles.columnContainer}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsRowContainer}>
        {stats.map(({name, count}) =>
          <Statistic key={name} statisticName={name} count={count}/>
        )}
      </View>
    </View>
  )
}

export default RepositoryItem