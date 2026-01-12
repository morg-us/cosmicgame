using UnityEngine;
using UnityEngine.UI;

public class ProfileUIController : MonoBehaviour
{
    public Text playerNameText;
    public Text levelText;
    public Slider xpBar;

    public PlayerProfile profile;

    void Start()
    {
        UpdateUI();
    }

    void UpdateUI()
    {
        playerNameText.text = profile.playerName;
        levelText.text = "Level " + profile.level;
        xpBar.value = profile.experience;
    }
}

