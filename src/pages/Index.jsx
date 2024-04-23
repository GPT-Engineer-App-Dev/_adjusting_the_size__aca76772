import React, { useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaGolfBall, FaTrophy } from "react-icons/fa";
import PlayerNameInput from "./PlayerNameInput";

const Index = () => {
  const [playerNames, setPlayerNames] = useState([""]);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentHole, setCurrentHole] = useState(0);

  const startGame = () => {
    setPlayers(playerNames.map((name) => ({ name, scores: Array(18).fill(0) })));
    setGameStarted(true);
  };

  const handleScoreChange = (playerIndex, holeIndex, score) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[holeIndex] = score === "" ? "" : Number(score);
    setPlayers(newPlayers);
  };

  if (!gameStarted) {
    return (
      <VStack spacing={4} p={2}>
        <Heading as="h1" size="lg" textAlign="center">
          Enter Player Names
        </Heading>
        <PlayerNameInput playerNames={playerNames} setPlayerNames={setPlayerNames} startGame={startGame} />
      </VStack>
    );
  }

  return (
    <VStack spacing={4} p={2}>
      <Heading as="h1" size="lg" textAlign="center">
        Mini Golf Score Card <FaGolfBall />
      </Heading>
      <VStack spacing={4} width="full">
        {players.map((player, index) => (
          <Box key={index} p={1} borderWidth="1px" borderRadius="lg">
            {player.name}
          </Box>
        ))}
      </VStack>
      <VStack width="full" mt={2}>
        <ButtonGroup isAttached variant="outline">
          <Button onClick={() => setCurrentHole(currentHole - 1)} isDisabled={currentHole === 0}>
            Previous Hole
          </Button>
          <Button onClick={() => setCurrentHole(currentHole + 1)} isDisabled={currentHole === 17}>
            Next Hole
          </Button>
        </ButtonGroup>
      </VStack>
      <Box width="full" overflowX="auto" mt={2}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              {players.map((player, index) => (
                <Th key={index} fontSize={{ base: "sm", md: "md" }}>
                  {player.name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric>{`Hole ${currentHole + 1}`}</Td>
              {players.map((player, playerIndex) => (
                <Td key={playerIndex} isNumeric>
                  <Input type="number" value={player.scores[currentHole] === 0 ? "" : player.scores[currentHole]} onChange={(e) => handleScoreChange(playerIndex, currentHole, e.target.value)} size="xs" max={10} />
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td fontWeight="bold">Total</Td>
              {players.map((player, index) => (
                <Td key={index} isNumeric fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  {player.scores.reduce((total, score) => total + (score === "" ? 0 : score), 0)}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

import { Input, Button, ButtonGroup } from "@chakra-ui/react";

export default Index;
